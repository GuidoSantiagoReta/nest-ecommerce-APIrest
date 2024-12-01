import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';


const mockReflector = {
  get: jest.fn(),
};

const mockConfigService = {
  apiKey: 'mockApiKey',
};

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const guard = new ApiKeyGuard(mockReflector as any, mockConfigService as any);
    expect(guard).toBeDefined();
  });
});
