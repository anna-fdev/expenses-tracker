import { ApiUser } from '../user';

export type ApiAuthParams = {
  email: string;
  password: string;
};

export type ApiSignUpResponse = {
  token: string;
  user: ApiUser;
};
