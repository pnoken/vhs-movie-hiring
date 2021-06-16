import { Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import { ErrorMessage } from '@hookform/error-message';
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { Store } from '../../../contextStore';
import { STORETYPES } from '../../../utils/shared';
import { GET } from '../../../utils/request';
import { Admin } from '../../../utils/apiEndpoint';

const RentalForm = ({ closeModal }) => {
  const [movieNumber, setMovieNumber] = useState(1);
  const { state, dispatch } = useContext(Store);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await GET(Admin.adminUsers);
      //   console.log('user ' + JSON.stringify(resp.data));
      if (resp && resp.data) {
        dispatch({ type: STORETYPES.USERS, payload: resp.data });
      }
      const resp1 = await GET(Admin.adminMovies);
      if (resp1 && resp1.data) {
        dispatch({ type: STORETYPES.MOVIES, payload: resp1.data });
      }
    };
    fetchUsers();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm();

  const movieArray = length => {
    return Array.from({ length }, (_, i) => i);
  };

  const submitForm = formData => {
    console.log(formData);
    setMovieData([...movieData, formData]);
    let values = [];
    let quantity = [];

    formData.movies.map((m, idx) => {
      //   console.log('here ', m.value);
      values.push(m.value);
    });
    formData.quantity.map((q, idx) => {
      //  console.log('here ', m.value);
      quantity.push(q);
    });

    formData.quantity.map((qty, idx) => {
      values[idx].quantity = parseInt(qty);
    });
    console.log('values ', values);

    formData.movies.map((m, idx) => {
      formData.movies[idx] = values[idx];
    });

    console.log('after ', formData);
  };

  const removeField = index => {
    setMovieNumber(movieNumber - 1);
  };

  const addField = () => {
    setMovieData([...movieData]);
    setMovieNumber(movieNumber + 1);
  };

  let customerSelect = [{ value: {}, label: '' }];
  let movieSelect = [{ value: {}, label: '' }];

  // users
  _.filter(state.users, e => {
    return e.role !== 'admin';
  }).map(user => {
    delete user.password;
    delete user.credit_balance;

    customerSelect.push({
      value: user,
      label: `${user.first_name} ${user.last_name}`,
    });
  });

  // movies
  _.filter(state.movies, m => {
    return m.available >= 1;
  }).map(movie => {
    movieSelect.push({
      value: movie,
      label: movie.name,
    });
  });

  return (
    <>
      <Form
        id="rentalForm"
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
      >
        <Form.Group>
          <Form.Label>Customer</Form.Label>
          <Controller
            options={customerSelect}
            name="customer"
            control={control}
            rules={{ required: 'Please select a customer' }}
            render={({ field }) => (
              <ReactSelect {...field} options={customerSelect} isClearable />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="customer"
            as={<p className="error" />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Movie(s)</Form.Label>
          {movieArray(movieNumber).map((number, index) => {
            return (
              <>
                <div className="row">
                  <div className="col col-md-7 col-sm-12">
                    <div key={number}>
                      <Controller
                        options={movieSelect}
                        name={`movies[${number}]`}
                        control={control}
                        rules={{ required: 'Please select a movie' }}
                        render={({ field }) => (
                          <ReactSelect
                            {...field}
                            options={movieSelect}
                            isC
                            learable
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col col-md-3 col-sm-1">
                    <Form.Control
                      type="number"
                      placeholder="Qty"
                      {...register(`quantity[${number}]`, {
                        required: true,
                        minLength: 1,
                      })}
                      defaultValue={1}
                      min={1}
                    />
                  </div>
                  <div className="col col-md-2 col-sm-1">
                    <span
                      type="button"
                      className="btn btn-danger btn-sm float-end form-control"
                      name={index}
                      onClick={() => removeField(index)}
                    >
                      X
                    </span>
                  </div>
                </div>
                <br />

                {/* <ErrorMessage
                  errors={errors}
                  name={`movie${number}`}
                  as={<p className="error" />}
                /> */}
              </>
            );
          })}

          <div style={{ float: 'right' }} className="mt-4">
            <span
              className="btn btn-success btn-sm float-start "
              onClick={addField}
              style={{ marginRight: '5px' }}
            >
              Add
            </span>
            {/* <button
              className="btn btn-danger btn-sm float-end"
              onClick={removeField}
            >
              Remove
            </button> */}
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default RentalForm;
