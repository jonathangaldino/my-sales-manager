export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User tried to signup with an existing email');
  }
}

export class FailedToRegisterError extends Error {
  constructor() {
    super('Failed to create your account. Contact our support.');
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials error.');
  }
}
