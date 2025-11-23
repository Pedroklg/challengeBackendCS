export function normalizeCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]+/g, '');
}
