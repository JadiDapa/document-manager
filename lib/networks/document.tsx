import { CreateDocumentType, DocumentType } from "../types/document";
import { axiosInstance } from "./axiosInstance";

export async function getAllDocuments() {
  const { data } = await axiosInstance.get<DocumentType[]>("/documents");
  return data;
}

export async function getDocumentById(id: string) {
  const { data } = await axiosInstance.get<DocumentType>("/documents/" + id);
  return data;
}

export async function createDocument(values: CreateDocumentType) {
  const { data } = await axiosInstance.post("/documents", values);
  return data;
}

export async function updateDocument(id: string, values: CreateDocumentType) {
  const { data } = await axiosInstance.put(`/documents/${id}`, values);
  return data;
}

export async function deleteDocument(id: string) {
  const { data } = await axiosInstance.delete("/documents/" + id);
  return data;
}
