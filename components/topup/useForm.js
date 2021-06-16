import { useState } from 'react';
import validateInfo from './ValidateInfo';
import { POST } from '../../utils/request';
import { User } from '../../utils/apiEndpoint';

const useForm = () => {
  const [values, setValues] = useState({
    cardName: '',
    cardNumber: '',
    cardType: '',
    cardExpiration: '',
    cardSecurityCode: '',
    cardPostalCode: '',
    focus: '',
    amount: 0,
  });

  const [errors, setErrors] = useState({});

  const handleFocus = e => {
    setValues({
      ...values,
      focus: e.target.name === 'cardSecurityCode' ? 'cvc' : e.target.name,
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(validateInfo(values));

    console.log('Values from card', values);
    // now make our api call
    const resp = await POST(User.userTopUp, {
      amount: values.amount,
      payment_method: values.cardType,
    });

    if (resp && resp.data) {
      console.log('Data coming from the backend after ', resp.data);
    } else {
      console.log('Error', resp);
    }
  };

  return { handleChange, handleFocus, handleSubmit, values, errors };
};

export default useForm;
