import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInuser] = useContext(UserContext);
  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input
        name='name'
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder='Your Name'
      />
      {errors.exampleRequired && (
        <span className='error'>Name is required</span>
      )}

      <input
        name='email'
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder='Your Email'
      />
      {errors.exampleRequired && (
        <span className='error'>Email is required</span>
      )}

      <input
        name='address'
        ref={register({ required: true })}
        placeholder='Your Address'
      />
      {errors.exampleRequired && (
        <span className='error'>Address is required</span>
      )}

      <input
        name='phone'
        ref={register({ required: true })}
        placeholder='Your Phone'
      />
      {errors.exampleRequired && (
        <span className='error'>Phone is required</span>
      )}

      <input type='submit' />
    </form>
  );
};

export default Shipment;
