import Joi from 'joi';
export const createFlashcardValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  folderId: Joi.number().required(),
  path: Joi.string().required(),
  sourceId: Joi.string().required(),
  flashcards: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
      }),
    )
    .required(),
});
