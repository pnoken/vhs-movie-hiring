import { useState, useEffect, useContext } from 'react';

import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

import { Movies } from '../../../utils/apiEndpoint';
import { PUT, POST } from '../../../utils/request';
import notify from '../../../utils/toast';
import { Store } from '../../../contextStore';
import { STORETYPES } from '../../../utils/shared';

const MovieForm = ({ selected, closeModal }) => {
  const { state: movieState, dispatch } = useContext(Store);

  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [year, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  // auto populate fields in case of edit
  useEffect(() => {
    console.log('here ' + JSON.stringify(selected));
    if (!_.isEmpty(selected)) {
      setTitle(selected.name);
      setCost(selected.price);
      setQuantity(selected.available);
      setReleaseYear(selected.release_year);
      setGenre(selected.genre);
    }
  }, []);

  useEffect(() => {
    setValue('name', title);
    setValue('price', cost);
    setValue('available', quantity);
    setValue('release_year', year);
    setValue('genre', genre);
  }, [title, cost, quantity, year, genre]);

  const submitForm = async data => {
    // active comes as a String, so we convert to Boolean
    // data.active = !!data.active;
    console.log(data);
    let resp = null;
    try {
      if (_.isEmpty(selected)) {
        resp = await POST(Movies.adminMovies, data);
      } else {
        resp = await PUT(`${Movies.adminMovies}/${selected._id}`, data);
      }
      if ((resp && resp.status === 200) || resp.status === 201) {
        console.log('resp here!!!! ' + JSON.stringify(resp));

        if (resp.config.method === 'post') {
          dispatch({
            type: STORETYPES.MOVIES,
            payload: [...movieState.movies, resp.data],
          });
        } else if (resp.config.method === 'put') {
          _.remove(movieState.movies, m => {
            return m._id === resp.data._id;
          });
          dispatch({
            type: STORETYPES.MOVIES,
            payload: [...movieState.movies, resp.data],
          });
        }
        notify().success('Movie added successfully');
        closeModal();
      } else {
        console.log('resp here! ' + JSON.stringify(JSON.stringify(resp)));
        notify().error('Sorry something went wrong');
      }
    } catch (error) {
      console.log('Error submiting ' + error);
      notify().error('Sorry something went wrong');
    }
  };

  return (
    <>
      <Form
        id="movieForm"
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
      >
        <Form.Group>
          <Form.Label>Movie Title </Form.Label>
          <Form.Control
            onChange={e => setTitle(e.target.value)}
            {...register('name', {
              required: 'title required',
              maxLength: 20,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Genre </Form.Label>
          <Form.Control
            onChange={e => setGenre(e.target.value)}
            {...register('genre', {
              required: 'Genre required',
              maxLength: 20,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="genre"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Release year</Form.Label>
          <Form.Control
            {...register('release_year', {
              required: 'Release year required',
              maxLength: { value: 4, message: 'Maximum length of 4' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="release_year"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            min="1"
            {...register('price', {
              required: 'Price is requred',
              min: { value: 1, message: 'Price should be at list GHS1' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="price"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Quantity Available</Form.Label>
          <Form.Control
            type="number"
            min="0"
            {...register('available', {
              required: 'Quantity required',
              min: { value: 0, message: 'Quantity should be at least 0' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="available"
            as={<p className="error" />}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default MovieForm;
