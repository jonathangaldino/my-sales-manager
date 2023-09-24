import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { defaultErrorSchema } from '~/shared/decorators/swagger.decorators';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

export const defaultUnauthorized = () =>
  ApiResponse({
    status: 401,
    description: 'In case of invalid or missing authentication bearer token',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'String',
          example: 'Unauthorized',
        },
      },
    },
  });

export function RegisterAPIDocs() {
  return applyDecorators(
    ApiTags('auth'),
    ApiBearerAuth(),
    ApiConsumes('application/json'),
    ApiBody({
      description: 'Your credentials',
      type: RegisterDTO,
    }),
    ApiResponse({
      status: 201,
      description:
        'Account is created. You get the token of the new account to use our services.',
      schema: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Account already exists with that email.',
      schema: defaultErrorSchema('Account already exists with that email.'),
    }),

    ApiResponse({
      status: 500,
      description:
        'Our service failed to register your account. Contact our support.',
      schema: defaultErrorSchema(
        'Failed to create your account. Contact our support.',
      ),
    }),
  );
}

export function LoginAPIDocs() {
  return applyDecorators(
    ApiTags('auth'),
    ApiBearerAuth(),
    ApiConsumes('application/json'),
    ApiBody({
      description: 'Your credentials',
      type: LoginDTO,
    }),
    ApiResponse({
      status: 201,
      description: 'Signed in. Token for you to use within our services.',
      schema: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
    }),
    ApiResponse({
      status: 422,
      description: 'Your credentials are invalid.',
      schema: defaultErrorSchema('Invalid credentials error.'),
    }),
  );
}
