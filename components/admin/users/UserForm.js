import { useState, useEffect, useContext, useRef } from 'react';

import { Form, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

import { Admin } from '../../../utils/apiEndpoint';
import { PUT, POST } from '../../../utils/request';
import notify from '../../../utils/toast';
import { Store } from '../../../contextStore';
import { STORETYPES } from '../../../utils/shared';

const UserForm = ({ selected, closeModal }) => {
  const { state: userState, dispatch } = useContext(Store);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // console.log('here ' + JSON.stringify(selected));
    if (!_.isEmpty(selected)) {
      setFirstName(selected.first_name);
      setLastName(selected.last_name);
      setUsername(selected.username);
      setEmail(selected.email);
      setAge(selected.age);
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  useEffect(() => {
    setValue('first_name', firstName);
    setValue('last_name', lastName);
    setValue('username', username);
    setValue('email', email);
    setValue('age', age);
  }, [firstName, lastName, username, email, age]);

  const submitForm = async data => {
    delete data.confirm_password;
    console.log(data);
    let resp = null;
    try {
      if (_.isEmpty(selected)) {
        resp = await POST(Admin.adminUsers, data);
      } else {
        resp = await PUT(`${Admin.adminUsers}/${selected._id}`, data);
      }

      if ((resp && resp.status === 200) || resp.status === 201) {
        console.log('resp here!!!! ' + JSON.stringify(resp));

        if (resp.config.method === 'post') {
          dispatch({
            type: STORETYPES.USERS,
            payload: [...userState.users, resp.data],
          });
        } else if (resp.config.method === 'put') {
          _.remove(userState.users, m => {
            return m._id === resp.data._id;
          });
          dispatch({
            type: STORETYPES.USERS,
            payload: [...userState.users, resp.data],
          });
        }
        notify().success('User added successfully');
        closeModal();
      } else {
        console.log('resp here! ' + JSON.stringify(JSON.stringify(resp)));
        notify().error('Sorry something went wrong');
      }
    } catch (error) {
      console.log('error ' + error);
      notify().error('Sorry something went wrong');
    }
  };

  return (
    <>
      <Form
        id="userForm"
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
      >
        <Row>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>First Name </Form.Label>
            <Form.Control
              {...register('first_name', {
                required: 'First Name required',
                maxLength: 20,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="first_name"
              as={<p className="error" />}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              {...register('last_name', {
                required: 'Last Name required',
                maxLength: 20,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="last_name"
              as={<p className="error" />}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              onChange={e => setEmail(e.target.value)}
              {...register('email', {
                required: 'Email required',
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as={<p className="error" />}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Username </Form.Label>
            <Form.Control
              onChange={e => setUsername(e.target.value)}
              {...register('username', {
                required: 'Username required',
                maxLength: { value: 10, message: 'Maximum length should be 5' },
                minLength: { value: 5, message: 'Minimum length should be 5' },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              as={<p className="error" />}
            />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={6}>
            <Form.Label>Age </Form.Label>
            <Form.Control
              type="number"
              min="10"
              onChange={e => setAge(e.target.value)}
              {...register('age', {
                required: 'Age required',
                min: { value: 10, message: 'Age should be at least 10' },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="age"
              as={<p className="error" />}
            />
          </Form.Group>
          {_.isEmpty(selected) && (
            <>
              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', {
                    required: 'Password required',
                    min: { value: '6', message: 'Minimum of 6 characters' },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  as={<p className="error" />}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password </Form.Label>
                <Form.Control
                  type="password"
                  {...register('confirm_password', {
                    validate: value =>
                      value === password.current || 'Password do not match',
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirm_password"
                  as={<p className="error" />}
                />
              </Form.Group>
            </>
          )}
        </Row>
      </Form>
    </>
  );
};

export default UserForm;
