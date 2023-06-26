import React, { useState, useRef } from 'react';

const AddForm = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    quote: ''
  });

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formInput);

    formRef.current.reset();
  };

  const handleChange = (e) =>
    setFormInput((prev) => {
      const key = e.target.name;
      let value = e.target.value;

      value = parseInt(value, 10) || value;

      return { ...prev, [key]: value };
    });

  return (
    <div className='flex flex-col' ref={formRef}>
      <input
        className='py-2 px-4 border border-gray-300 rounded-md'
        name='quote'
        placeholder='Quote'
        type='string'
        onChange={handleChange}
        value={formInput.price}
      />
      <input
        className='py-2 px-4 border border-gray-300 rounded-md'
        name='name'
        placeholder='Name'
        type='name'
        onChange={handleChange}
        value={formInput.total}
      />
      <button className='py-2 px-4 mt-4 text-black rounded-md' type='submit'>
        Add Quote
      </button>
    </div>
  );
};

export default AddForm;
