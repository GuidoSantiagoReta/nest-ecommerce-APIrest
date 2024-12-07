import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('debería estar definido', () => {
    const reflector = new Reflector();
    expect(new RolesGuard(reflector)).toBeDefined();
  });
});
