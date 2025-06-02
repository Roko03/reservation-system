export type DocumentDescriptor = {
  id: number;
  url: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  fileDescription: string;
};

export type DocumentUploadDescriptor = {
  content: string | ArrayBuffer | null;
  fileName: string;
  fileSize: string;
  mimeType: string;
  description?: string;
};
