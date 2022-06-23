"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUserReg = void 0;
const Joi = require("joi");
const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().min(5).required(),
    confirmPassword: Joi.ref("password"),
});
const validateUserReg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield registerSchema.validate(req.body);
    if (value.error) {
        res.status(400).json({
            status: "Failed",
            message: value.error.details[0].message
        });
    }
    else {
        next();
    }
});
exports.validateUserReg = validateUserReg;
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).required(),
});
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield loginSchema.validate(req.body);
    if (value.error) {
        res.status(400).json({
            status: "Failed",
            message: value.error.details[0].message
        });
    }
    else {
        next();
    }
});
exports.validateLogin = validateLogin;
