export interface Esmalte {
  id: number;
  nome: string;
  marca: string;
  dataVencimento: string | null;
  observacoes: string | null;
  caminhoImagem: string | null;
}