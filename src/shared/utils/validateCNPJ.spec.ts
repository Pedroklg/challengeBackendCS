import { isValidCNPJ } from './validateCNPJ';

describe('isValidCNPJ', () => {
  it('should return true for a valid CNPJ', () => {
    const validCNPJ = '11222333000181'; // 11.222.333/0001-81
    expect(isValidCNPJ(validCNPJ)).toBe(true);
  });

  it('should return true for a valid CNPJ with formatting', () => {
    const validCNPJ = '11.222.333/0001-81';
    expect(isValidCNPJ(validCNPJ)).toBe(true);
  });

  it('should return false for an invalid CNPJ with wrong check digits', () => {
    const invalidCNPJ = '11222333000182';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  it('should return false for CNPJ with all repeated digits', () => {
    const invalidCNPJ = '11111111111111';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  it('should return false for CNPJ with length less than 14', () => {
    const invalidCNPJ = '123456789';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  it('should return false for CNPJ with length more than 14', () => {
    const invalidCNPJ = '123456789012345';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidCNPJ('')).toBe(false);
  });

  it('should return false for null', () => {
    // @ts-expect-error testing invalid input type
    expect(isValidCNPJ(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    // @ts-expect-error testing invalid input type
    expect(isValidCNPJ(undefined)).toBe(false);
  });

  it('should return false for non-string input', () => {
    // @ts-expect-error testing invalid input type
    expect(isValidCNPJ(123)).toBe(false);
  });

  it('should return false for CNPJ with non-digit characters after cleaning', () => {
    const invalidCNPJ = '11.222.333/0001-82'; // wrong check digit
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });
});
