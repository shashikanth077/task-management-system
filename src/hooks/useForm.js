import { useState, useEffect } from "react";

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form values
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const validationErrors = validate({ [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  // Handle form submit
  const handleSubmit = (e, callback) => {
    e.preventDefault();

    // Validate the entire form on submit
    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback(values); 
    }
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
  };
};
