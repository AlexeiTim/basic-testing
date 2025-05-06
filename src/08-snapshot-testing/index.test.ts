import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const VALUES = [1, 2];

  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(VALUES);
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(VALUES);

    expect(result).toMatchSnapshot();
  });
});
