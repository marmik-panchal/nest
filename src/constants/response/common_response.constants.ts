import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from '@app/utils/response/response.interface';

export const responseName = {
  USER_CREATED: 'USER_CREATED',
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_USER: 'GET_USER',
  GET_POST: 'GET_POST',
  GET_ALL_POSTS: 'GET_ALL_POSTS',
  POST_CREATED: 'POST_CREATED',
};

export const responseInfo: Record<string, iResponseStatusMessage> = {
  USER_CREATED: {
    message: 'User created successfully',
    statusCode: HttpStatus.CREATED,
  },
  GET_ALL_USERS: {
    message: 'Users Fetched successfully',
    statusCode: HttpStatus.OK,
  },
  GET_USER: {
    message: 'User Fetched successfully',
    statusCode: HttpStatus.OK,
  },
  POST_CREATED: {
    message: 'Post created successfully',
    statusCode: HttpStatus.CREATED,
  },
  GET_POST: {
    message: 'Post Fetched successfully',
    statusCode: HttpStatus.OK,
  },
  GET_ALL_POSTS: {
    message: 'Posts Fetched successfully',
    statusCode: HttpStatus.OK,
  },
};
