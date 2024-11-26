import { validate } from "validate.js";

export const validateString = (id, value) => {
  //[inputId] inside brackets means to take the id ("firstName" or "lastName") of the object, otherwise it will print / output only inputId
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.format = {
      pattern: "[a-z]+",
      flags: "i",
      message: "value can only contain letters",
    };
  }
  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validateEmail = (id, value) => {
  //[inputId] inside brackets means to take the id ("firstName" or "lastName") of the object, otherwise it will print / output only inputId
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.email = true;
  }
  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};
export const validatePassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.length = {
      minimum: 6,
      message: "Must be at least 6 characters",
    };
  }
  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};
export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  //[inputId] inside brackets means to take the id ("firstName" or "lastName") of the object, otherwise it will print / output only inputId
  const constraints = {
    presence: { allowEmpty },
  };

  if (!allowEmpty || value !== "") {
    
    constraints.length = {};

    if(minLength != null){
      constraints.length.minimum = minLength;
    }
    if(maxLength != null){
      constraints.length.maximum = maxLength;
    }
  }
  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};