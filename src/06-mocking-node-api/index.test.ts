import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => {
  const actual = jest.requireActual<typeof import('fs')>('fs');
  return {
    ...actual,
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  const actual =
    jest.requireActual<typeof import('fs/promises')>('fs/promises');
  return {
    ...actual,
    readFile: jest.fn(),
  };
});

jest.mock('path', () => {
  return {
    join: jest.fn(),
  };
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const testFn = jest.fn();

    doStuffByTimeout(testFn, 500);

    expect(testFn).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const testFn = jest.fn();

    doStuffByTimeout(testFn, 500);

    expect(testFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const testFn = jest.fn();

    doStuffByInterval(testFn, 500);
    expect(testFn).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const testFn = jest.fn();

    doStuffByInterval(testFn, 500);
    expect(testFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(500);
    expect(testFn).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const TEST_PATH = 'test.123/terwre/123123123123';

  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockImplementation((_, b) => b);
    await readFileAsynchronously(TEST_PATH);

    expect(join).toHaveBeenCalledWith(__dirname, TEST_PATH);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockImplementation(() => false);

    const result = await readFileAsynchronously(TEST_PATH);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const TEST_FILE_CONTENT = 'TEST';

    (existsSync as jest.Mock).mockImplementation(() => true);
    (readFile as jest.Mock).mockResolvedValue(TEST_FILE_CONTENT);

    const result = await readFileAsynchronously(TEST_PATH);

    expect(result).toEqual(TEST_FILE_CONTENT);
  });
});
