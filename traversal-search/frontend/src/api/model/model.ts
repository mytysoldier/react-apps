export type SearchDocumentResponse = {
  count: number;
  result: SearchDocumentResult[];
};

export type SearchDocumentResult = {
  fileName: string;
  text: string;
};
