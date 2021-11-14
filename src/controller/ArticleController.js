import * as articleRepository from '../repository/ArticleRepository';
import { transformArticleData } from '../Utils';
import axios from 'axios';
import { API_KEY } from '../Configs';
import { defaultLogger } from '../LoggerUtils';

const logger = defaultLogger();

export const getAllArticles = async () => {
  logger.info('Request received to get all articles');
  return await articleRepository.getAllArticles();
};

export const getArticleById = async (req) => {
  logger.info(`Request received to get article by id ${req.params.id}`);
  return await articleRepository.getArticle(req.params.id);
};

export const importArticles = async (req) => {
  logger.info(`Request received to import articles from external api`);
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${req.query.query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const transformedData = transformArticleData(response.data.articles);
    await articleRepository.bulkDelete();
    await articleRepository.insertNewsArticles(transformedData);
    return null;
  } catch(error) {
    logger.error(`Error occurred while importing articles ${error}`);
    throw error;
  }
};

