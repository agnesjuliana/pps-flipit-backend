import Joi from 'joi';
export const createPlayResultValidation = Joi.object({
  flashcardItemId: Joi.number().required(),
  playId: Joi.number().required(),
  isTrue: Joi.boolean().required(),
});
