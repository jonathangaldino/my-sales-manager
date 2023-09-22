import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import {
  FailedToRegisterError,
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from './errors/auth.errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(
    @Body(new ValidationPipe())
    registerDTO: RegisterDTO,
    @Res() res: Response,
  ) {
    const { error, data } = await this.authService.register(registerDTO);

    if (error instanceof UserAlreadyExistsError) {
      return res.status(HttpStatus.CONFLICT).json({
        message: error.message,
      });
    }

    if (error instanceof FailedToRegisterError) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      token: data.token,
    });
  }

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) loginDTO: LoginDTO,
    @Res() res: Response,
  ) {
    const { error, data } = await this.authService.login(loginDTO);

    if (error instanceof InvalidCredentialsError) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: error.message,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      token: data.token,
    });
  }
}
