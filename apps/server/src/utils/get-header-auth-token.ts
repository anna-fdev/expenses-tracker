import { Request } from 'express';

export const getHeaderAuthToken = (request: Request): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];

  return type === 'Bearer' ? token : undefined;
};
