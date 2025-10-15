import type { Note } from '../types/note';
import { apiClient } from './client';

export interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface apiParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

// GET
export const fetchNotes = async (
  params: apiParams = {},
): Promise<ApiResponse> => {
  const { data } = await apiClient.get<ApiResponse>('/notes', { params });
  console.log('🚀 | data:', data);

  return data;
};
// GET by Id
export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  console.log('🚀 | data:', data);

  return data;
};

// POST
export const createNote = async (note: Note): Promise<Note> => {
  const { data } = await apiClient.post<Note>('/notes', note);
  console.log('🚀 | data:', data);

  return data;
};
// PATCH
export const updateNote = async (note: Note): Promise<Note> => {
  const { data } = await apiClient.patch<Note>(`/notes/${note.id}`, note);
  console.log('🚀 | data:', data);

  return data;
};

// DELETE
export const deleteNote = async (id: string): Promise<void> => {
  await apiClient.delete(`/notes/${id}`);
};
