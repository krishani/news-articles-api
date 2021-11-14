import { EntityNotFoundError, QueryFailedError } from 'typeorm';
const { ResourceNotFoundError } = require('../Errors');

export const errorHandler = (e, req, res, next) => {
  const handle = (status, message) => res.status(status).send(message);
  if (e instanceof ResourceNotFoundError) {
    handle(404, e.message);
  } else if (e instanceof QueryFailedError) {
    handle(400, e.message);
  }  else if (e instanceof EntityNotFoundError) {
    handle(404, e.message);
  } else {
    handle(500, e.message);
  }
};
