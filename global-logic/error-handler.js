import { CustomErrors } from "../app-error.js";

export const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      type: 'ValidationError',
      details: error.details
    });
  }
  
  if (error instanceof CustomErrors && error.errorCode === 301) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: 'Unable to access the files, authorization failed'
    })
  }
  // return res.status(400).send(error.message);
  return res.status(500).send('Unexpected error occured');
};