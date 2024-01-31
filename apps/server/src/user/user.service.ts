import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servise';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { getHeaderAuthToken } from '../utils';

import { Request } from 'express';
import { AuthParamsDto, SignUpResponseDto } from '../auth/dto/auth-dto';
import { UserDto } from './dto/user-dto';
import { plainToInstance } from 'class-transformer';
import { TokenDto } from './dto/token-dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async signUp(params: AuthParamsDto): Promise<SignUpResponseDto> {
    const { email, password } = params;

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new HttpException('user_already_exists', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const payload = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: plainToInstance(UserDto, createdUser, { strategy: 'excludeAll' }),
      token,
    };
  }

  async signIn(params: AuthParamsDto): Promise<TokenDto> {
    const { email, password } = params;

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async getUserMe(request: Request): Promise<UserDto> {
    const token = getHeaderAuthToken(request);

    const { id } = this.jwtService.decode(token);

    return await this.getUserById(id);
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // TODO make a common helper
    return plainToInstance(UserDto, user, { strategy: 'excludeAll' });
  }

  /**
   * `revokedToken` logic could be done later as part of service improvement
   * for this moment it is not part of the Demo
   */
}
