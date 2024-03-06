export type SearchDocumentResponse = {
  count: number;
  result: SearchDocumentResult[];
};

export type SearchDocumentResult = {
  file_name: string;
  text: string;
};
