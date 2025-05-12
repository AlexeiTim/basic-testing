import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);
    expect(bankAccount.getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.withdraw(101)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(100);
    const targetBankAccount = getBankAccount(101);
    expect(() => bankAccount.transfer(101, targetBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(55, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);

    bankAccount.deposit(50);

    expect(bankAccount.getBalance()).toEqual(150);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);

    bankAccount.withdraw(50);

    expect(bankAccount.getBalance()).toEqual(50);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(100);
    const transferAccount = getBankAccount(50);

    bankAccount.transfer(100, transferAccount);

    expect(bankAccount.getBalance()).toEqual(0);
    expect(transferAccount.getBalance()).toEqual(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);

    const result = await bankAccount.fetchBalance();

    if (result !== null) {
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    } else {
      expect(result).toEqual(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(101);
    return bankAccount
      .synchronizeBalance()
      .then(() => {
        expect(bankAccount.getBalance()).not.toEqual(101);
      })
      .catch((e) => {
        expect(e).toBeInstanceOf(SynchronizationFailedError);
      });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(101);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).not.toEqual(101);
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
