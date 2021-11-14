import { isNil, get, map } from 'lodash';

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

