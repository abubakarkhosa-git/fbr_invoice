import Joi from "joi";

export const validateSignInInputs = (data) => {
  const Schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  const result = Schema.validate(data);

  return {
    error: result?.error,
    msg: result?.error?.details?.[0]?.message,
  };
};
