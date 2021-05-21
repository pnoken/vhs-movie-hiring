import { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import _ from 'lodash';

const MovieForm = ({ selected }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');

  // auto populate fields in case of edit
  useEffect(() => {
    if (!_.isEmpty(selected)) {
      setTitle(selected.title);
      setGenre(selected.genre);
      setCost(selected.cost);
      setQuantity(selected.quantity);
    }
  }, []);

  useEffect(() => {
    register(title, genre, cost, quantity);
  }, [title, genre, cost, quantity]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitForm = data => {
    console.log(data);
  };

  return (
    <>
      <Form
        id="movieForm"
        onSubmit={handleSubmit(submitForm)}
        autoComplete="off"
      >
        <Form.Group>
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            {...register('title', {
              required: 'title required',
              maxLength: 20,
            })}
            defaultValue={title}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control
            defaultValue={genre}
            {...register('genre', {
              required: 'Genre required',
              maxLength: { value: 20, message: 'Maximum length of 20' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="genre"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Cost (per day)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            defaultValue={cost}
            {...register('cost', {
              required: 'Cost is requred',
              min: { value: 1, message: 'Cost should be at list GHS1' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="cost"
            as={<p className="error" />}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Quantity Available</Form.Label>
          <Form.Control
            type="number"
            min="1"
            defaultValue={quantity}
            {...register('quantity', {
              required: 'Quantity required',
              min: { value: 1, message: 'Quantity should be at least 1' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="quantity"
            as={<p className="error" />}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default MovieForm;
