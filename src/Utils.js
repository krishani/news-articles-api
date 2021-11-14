import { isNil, get, isEmpty, map } from 'lodash';
import crypto from 'crypto';
import { ResourceNotFoundError } from './Errors';

export const RequestMethod = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
};

export const getStatusCode = (method, content) => {
  if (isNil(content)) return 204;
  if (method === RequestMethod.POST.toUpperCase() && !get(content, 'requestFailed', false)) {
    return 201;
  } else {
    return 200;
  }
};

export const hashPasswordWithSalt  = (password) => {
  const userSpecificSalt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, userSpecificSalt, 1000, 64, `sha512`).toString(`hex`);
  return { salt: userSpecificSalt, hash };
};

export const isPasswordValid = (password, storedHash, salt) => {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return storedHash === newHash;
};

export const validateLogin = (userFromDb, password) => {
  if (isEmpty(userFromDb) || !isPasswordValid(password, userFromDb.password, userFromDb.salt)) {
    throw new ResourceNotFoundError('Username or password incorrect');
  }
};

export const transformArticleData = (articles) => map(articles, (article, i)=> {
  return {
    id: i + 1,
    sourceId: article.source.id,
    sourceName: article.source.name,
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content
  }
});

