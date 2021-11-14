import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import _ from 'lodash';
import cors from 'cors';
import { dbConnection } from './connection/Connection';
import { getStatusCode } from './Utils';
import { errorHandler } from './middleware/ErrorHandler';
import { routes } from './router';
import { defaultLogger } from './LoggerUtils';

const app = express();
const port = 4000;
const logger = defaultLogger();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  logger.info(`App running on port ${port}`)
});

app.get('/', (request, response) => {
  response.json({ data: 'Welcome to the movie API' });
});

dbConnection
  .then(() => {
    _.forEach(routes, route => {
      app[route.method](route.path, (req, res, next) => {
        route.handler(req, res)
          .then(data => {
            const content = _.isArray(data) ? { data } : data;
            res.status(getStatusCode(req.method, content)).send(content);
          })
          .catch(e => {
            next(e);
          })
      }, errorHandler);
    });
  }).catch(err => {
    logger.error(`Error while creating the database connection ${err}`);
});
