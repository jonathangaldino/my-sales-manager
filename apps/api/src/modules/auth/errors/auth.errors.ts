export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Account already exists with that email');
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

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found.');
  }
}
