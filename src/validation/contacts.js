import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/contactType.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(30).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...Object.values(CONTACT_TYPE))
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...Object.values(CONTACT_TYPE)),
});
