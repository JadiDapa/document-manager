import { ItemType } from "./item";

export interface CreateDocumentType {
  title: string;
  description: string;
  type: DocumentTypeEnum;
  fileType: FileTypeEnum;
  fileUrl: string;
  itemId: string;
  views: number;
}

export interface DocumentType extends CreateDocumentType {
  id: string;
  item: ItemType;
  createdAt: Date;
  updatedAt: Date;
}

export enum FileTypeEnum {
  PDF = "PDF",
  DOC = "DOC",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  EXCEL = "EXCEL",
  OTHER = "OTHER",
}

export enum DocumentTypeEnum {
  PROCEDURE = "PROCEDURE",
  REGULATION = "REGULATION",
  ANNOUCEMENT = "ANNOUCEMENT",
  REPORTS = "REPORTS",
  OTHER = "OTHER",
}
