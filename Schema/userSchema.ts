const Joi = require("joi");
import { Request, Response, NextFunction } from "express";

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().alphanum().min(5).required(),
  confirmPassword: Joi.ref("password"),
});

const validateUserReg = async(req: Request, res: Response, next: NextFunction) => {
  const value = await registerSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      status: "Failed",
      message: value.error.details[0].message
    })
  } else {
    next();
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(5).required(),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const value = await loginSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      status: "Failed",
      message: value.error.details[0].message
    })
  } else {
    next();
  }
}

export { validateUserReg, validateLogin };
