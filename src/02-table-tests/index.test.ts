import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    description: 'add two positive numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Subtract,
    expected: 0,
    description: 'subtract equal numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Divide,
    expected: 1.5,
    description: 'divide two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
    description: 'multiply two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
    description: 'exponentiate two numbers',
  },
  {
    a: -1,
    b: 2,
    action: Action.Add,
    expected: 1,
    description: 'add negative and positive numbers',
  },
  {
    a: 0,
    b: 5,
    action: Action.Multiply,
    expected: 0,
    description: 'multiply by zero',
  },
  {
    a: 3,
    b: 2,
    action: 'TEST',
    expected: null,
    description: 'handle invalid action',
  },
  {
    a: 'Test',
    b: 'Test',
    action: Action.Divide,
    expected: null,
    description: 'handle invalid arguments',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should $description', ({ expected, a, b, action }) => {
    expect(simpleCalculator({ a, b, action })).toEqual(expected);
  });
});
