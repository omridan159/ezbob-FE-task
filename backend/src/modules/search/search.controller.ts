import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../errors';
import catchAsync from '../utils/catchAsync';

interface SearchResult {
  title: string;
  description: string;
  url: string;
}

// Simulate a local DB (in-memory)
const localDB: SearchResult[] = [
  { title: 'React Tutorial', description: 'Learn React', url: 'https://reactjs.org/' },
  { title: 'React Redux Guide', description: 'Redux for state', url: 'https://redux.js.org/' },
  { title: 'JavaScript Guide', description: 'Learn JS', url: 'https://developer.mozilla.org/' },
  { title: 'Node.js Crash Course', description: 'Node basics', url: 'https://nodejs.org/' },
  { title: 'Express.js Docs', description: 'Express server', url: 'https://expressjs.com/' },
  { title: 'TypeScript Handbook', description: 'Learn TS', url: 'https://www.typescriptlang.org/' },
  { title: 'MongoDB Tutorial', description: 'Mongo basics', url: 'https://www.mongodb.com/' },
  { title: 'GraphQL Docs', description: 'GraphQL server', url: 'https://graphql.org/' },
  { title: 'Docker Guide', description: 'Containerize apps', url: 'https://www.docker.com/' },
  { title: 'Jest Testing', description: 'Unit testing', url: 'https://jestjs.io/' },
  { title: 'React Native Docs', description: 'Mobile apps', url: 'https://reactnative.dev/' },
];

export const getSuggestions = catchAsync(async (req: Request, res: Response) => {
  const { query } = req.query as { query: string };
  if (!query) {
    return res.status(httpStatus.OK).json([]);
  }

  const suggestions = localDB.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);

  return res.status(httpStatus.OK).json(suggestions);
});

export const search = catchAsync(async (req: Request, res: Response) => {
  const { query, page = '1', limit = '3' } = req.query as { query: string; page?: string; limit?: string };

  if (!query) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a search query (e.g. ?query=react)');
  }

  const startTime = Date.now();

  // Convert page and limit to numbers
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  // Validate pagination parameters
  if (Number.isNaN(pageNum) || Number.isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid pagination parameters.');
  }

  // Filter results based on the query
  const filteredResults = localDB.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  // Paginate results
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filteredResults.slice(startIndex, startIndex + limitNum);

  const duration = Date.now() - startTime;

  return res.status(httpStatus.OK).json({
    query,
    count: filteredResults.length,
    duration: `${duration} ms`,
    page: pageNum,
    totalPages: Math.ceil(filteredResults.length / limitNum),
    results: paginatedResults,
  });
});
