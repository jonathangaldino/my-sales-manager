import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { PrismaService } from '~/persistence/prisma/prisma.service';
import { ServiceResponse } from '~/shared/types';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import {
  FailedToRegisterError,
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from './errors/auth.errors';
import { generateToken } from './helpers/token.helpers';

type RegisterErrors = UserAlreadyExistsError | FailedToRegisterError;
type RegisterOutput = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};
type LoginErrors = InvalidCredentialsError;
type LoginOutput = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(
    registerDTO: RegisterDTO,
  ): Promise<ServiceResponse<RegisterOutput, RegisterErrors>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: registerDTO.email,
      },
    });

    if (user) {
      return {
        data: null,
        error: new UserAlreadyExistsError(),
      };
    }

    const passwordCrypt = hashSync(registerDTO.password, 8);

    try {
      const userPersisted = await this.prisma.user.create({
        data: {
          email: registerDTO.email,
          password: passwordCrypt,
        },
      });

      const token = generateToken({
        email: userPersisted.email,
        id: userPersisted.id,
      });

      return {
        data: {
          token,
          user: {
            id: userPersisted.id,
            email: userPersisted.email,
          },
        },
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: new FailedToRegisterError(),
      };
    }
  }

  async login(
    loginDTO: LoginDTO,
  ): Promise<ServiceResponse<LoginOutput, LoginErrors>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDTO.email,
      },
    });

    if (!user) {
      return {
        error: new InvalidCredentialsError(),
        data: null,
      };
    }

    const isCorrectPassword = compareSync(loginDTO.password, user.password);

    if (!isCorrectPassword) {
      return {
        data: null,
        error: new InvalidCredentialsError(),
      };
    }

    return {
      error: null,
      data: {
        token: generateToken({ email: user.email, id: user.id }),
      },
    };
  }
}
