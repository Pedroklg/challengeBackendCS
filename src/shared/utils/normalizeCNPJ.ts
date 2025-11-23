export function normalizeCNPJ(cnpj?: string | null): string | undefined {
  if (!cnpj || typeof cnpj !== 'string') return undefined;

  return cnpj.replace(/[^\d]+/g, '');
}
