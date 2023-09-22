import jwt from 'jsonwebtoken';

import { UserEntity } from '../entities/user.entity';

export function generateToken(user: Omit<UserEntity, 'password'>) {
  return jwt.sign({ id: user.id }, 'super-secret-key');
}

export function decryptToken(token: string): string | null {
  try {
    const decodedToken: { id?: string } = jwt.verify(token, 'batman');

    if (!decodedToken.id) {
      return null;
    }

    return decodedToken.id;
  } catch (err) {
    return null;
  }
}
