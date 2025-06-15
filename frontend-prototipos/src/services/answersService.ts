import { Answer } from '../types/answer';

const API_URL = 'http://localhost:8081/answers';

export const answersService = {
  async getAll(): Promise<Answer[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener respuestas');
    return res.json();
  },
  async getById(id: number): Promise<Answer> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Error al obtener respuesta');
    return res.json();
  },
  async create(answer: Omit<Answer, 'id' | 'created_at' | 'is_correct'>): Promise<Answer> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answer),
    });
    if (!res.ok) throw new Error('Error al crear respuesta');
    return res.json();
  },
  async update(id: number, answer: Partial<Answer>): Promise<Answer> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answer),
    });
    if (!res.ok) throw new Error('Error al actualizar respuesta');
    return res.json();
  },
  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar respuesta');
  },
}; 