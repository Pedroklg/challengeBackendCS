export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj || typeof cnpj !== 'string') return false;

  cnpj = cnpj.replace(/[\D]+/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calculateDigit = (base: string, weight: number[]) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i], 10) * weight[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const weight1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit1 = calculateDigit(cnpj.substring(0, 12), weight1);
  const digit2 = calculateDigit(cnpj.substring(0, 12) + digit1, weight2);

  return cnpj === cnpj.substring(0, 12) + digit1 + digit2;
}

export default isValidCNPJ;
