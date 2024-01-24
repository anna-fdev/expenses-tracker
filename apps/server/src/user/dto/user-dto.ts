import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name?: string;

  password: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  createdAt: string;
  updatedAt: string;
}
