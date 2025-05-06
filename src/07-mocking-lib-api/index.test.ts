import { throttledGetDataFromApi } from './index';
import axios from 'axios';

jest.mock('axios');

jest.mock('lodash', () => {
  return {
    throttle: jest.fn().mockImplementation((cb) => {
      return (path: string) => cb(path);
    }),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const TEST_PATH = '123123/123123';
  const TEST_RESPONSE = {
    data: 'TEST',
  };

  let mockGet: jest.Mock;
  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue(TEST_RESPONSE);
    (mockedAxios.create as jest.Mock).mockImplementation(() => {
      return {
        get: mockGet,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(TEST_PATH);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(TEST_PATH);

    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(TEST_PATH);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(TEST_PATH);

    expect(result).toEqual(TEST_RESPONSE.data);
  });
});
