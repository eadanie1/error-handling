import { CustomErrors } from "../app-error.js";
import { LOGIN_FAILED, NOT_FOUND, USER_NOT_AUTHORIZED } from "../constants/status-codes.js";

export const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      type: 'ValidationError',
      details: error.details
    });
  }
  
  if (error instanceof CustomErrors && error.errorCode === LOGIN_FAILED) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: 'Login was unsuccessful, please try again'
    })
  }
  
  if (error instanceof CustomErrors && error.errorCode === USER_NOT_AUTHORIZED) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: 'Unable to access the files, authorization failed'
    })
  }
  
  if (error instanceof CustomErrors && error.errorCode === NOT_FOUND) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: 'Products list could not be retrieved'
    })
  }
  
  return res.status(500).send('Unexpected error occured');
};