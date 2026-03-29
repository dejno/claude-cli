// Mock chalk before any imports
jest.mock('chalk', () => {
  const fn = (s: string) => s;
  return {
    __esModule: true,
    default: {
      red: fn,
      gray: fn,
      blue: fn,
      green: fn,
    }
  };
});

// Mock logger (breaks env dependency chain)
jest.mock('../logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  }
}));

import { CliError, handleError } from '../errors';

describe('CliError', () => {
  it('should create an error with code and message', () => {
    const error = new CliError('Something failed', 'ERR_001');
    expect(error.message).toBe('Something failed');
    expect(error.code).toBe('ERR_001');
    expect(error.name).toBe('CliError');
  });

  it('should create an error with details', () => {
    const details = { field: 'apiKey', reason: 'missing' };
    const error = new CliError('Validation failed', 'ERR_VAL', details);
    expect(error.details).toEqual(details);
  });

  it('should be an instance of Error', () => {
    const error = new CliError('Test', 'ERR');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CliError);
  });
});

describe('handleError', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should handle CliError with code', () => {
    const error = new CliError('Config missing', 'ERR_CONFIG');
    handleError(error);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle CliError with details', () => {
    const error = new CliError('Bad input', 'ERR_INPUT', { field: 'email' });
    handleError(error);
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle generic Error', () => {
    const error = new Error('Unexpected crash');
    handleError(error);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
