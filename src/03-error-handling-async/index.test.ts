import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(1)).resolves.toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const ERROR_MESSAGE = 'TEST';
    expect(() => throwError(ERROR_MESSAGE)).toThrow(ERROR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    const DEFAULT_MESSAGE = 'Oops!';
    expect(() => throwError()).toThrow(DEFAULT_MESSAGE);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
