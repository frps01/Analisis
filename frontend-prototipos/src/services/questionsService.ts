interface Question {
  id?: number;
  subject: string;
  level: string;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

const API_URL = 'http://localhost:8080';

export const questionsService = {
  // Obtener todas las preguntas
  getAll: async (): Promise<Question[]> => {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error('Error al obtener las preguntas');
    }
    return response.json();
  },

  // Obtener una pregunta por ID
  getOne: async (id: number): Promise<Question> => {
    const response = await fetch(`${API_URL}/questions/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener la pregunta');
    }
    return response.json();
  },

  // Crear una nueva pregunta
  create: async (question: Question): Promise<Question> => {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    if (!response.ok) {
      throw new Error('Error al crear la pregunta');
    }
    return response.json();
  },

  // Actualizar una pregunta
  update: async (id: number, question: Question): Promise<Question> => {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la pregunta');
    }
    return response.json();
  },

  // Eliminar una pregunta
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/questions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la pregunta');
    }
  },
}; 