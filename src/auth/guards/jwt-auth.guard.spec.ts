import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('debería estar definido', () => {
    const reflector = new Reflector();
    expect(new JwtAuthGuard(reflector)).toBeDefined();
  });
});

