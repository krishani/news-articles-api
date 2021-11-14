
import * as articleController from './controller/ArticleController';
import { RequestMethod } from './Utils';

export const routes = [
  {
    path: '/articles',
    method: RequestMethod.GET,
    handler: articleController.getAllArticles
  },
  {
    path: '/articles/:id',
    method: RequestMethod.GET,
    handler: articleController.getArticleById
  },
  {
    path: '/import',
    method: RequestMethod.POST,
    handler: articleController.importArticles
  }
];
