import { getRepository, getConnection } from 'typeorm';
import { isEmpty } from 'lodash';
import { defaultLogger } from '../LoggerUtils';

const logger = defaultLogger();

export const insertNewsArticles = async (articles) => {
  logger.info('[ArticleRepository] Bulk inserting new articles');
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into('Article')
    .values(articles)
    .execute();
  return articles;
};

export const getAllArticles = async () => {
  logger.info('[ArticleRepository] Get all articles');
  return await getRepository('Article').find();
};

export const getArticle = async (id) => {
  logger.info('[ArticleRepository] Get article by id');
  return await getRepository('Article').findOneOrFail({ id });
};

export const bulkDelete = async () => {
  logger.info('[ArticleRepository] Bulk deleting articles');
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from('Article')
    .execute();
  return null;
};
