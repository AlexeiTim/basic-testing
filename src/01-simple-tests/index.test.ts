import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Add,
    });

    expect(result).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Subtract,
    });

    expect(result).toEqual(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Multiply,
    });

    expect(result).toEqual(4);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Divide,
    });

    expect(result).toEqual(1);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Exponentiate,
    });

    expect(result).toEqual(4);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 2,
      action: 'test',
    });

    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'hello',
      b: 'heeey',
      action: Action.Divide,
    });

    expect(result).toEqual(null);
  });
});
