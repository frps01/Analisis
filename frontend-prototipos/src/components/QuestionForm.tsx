'use client';

import React, { useState, useEffect } from 'react';
import { questionsService } from '../services/questionsService';

export interface QuestionFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

const SUBJECTS = [
  'Matemática',
  'Lenguaje',
  'Historia',
  'Ciencias',
];

const levels = ['Fácil', 'Medio', 'Difícil'];

export default function QuestionForm({ initialData, onSubmit, onCancel, loading }: QuestionFormProps) {
  const [form, setForm] = useState({
    subject: '',
    level: '',
    statement: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
    }
    // eslint-disable-next-line
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Materia</label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1 bg-white"
          required
        >
          <option value="">Selecciona una materia</option>
          {SUBJECTS.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nivel</label>
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        >
          <option value="">Selecciona un nivel</option>
          <option value="Fácil">Fácil</option>
          <option value="Medio">Medio</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Enunciado</label>
        <textarea
          name="statement"
          value={form.statement}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Opción A</label>
          <input
            name="option_a"
            value={form.option_a}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Opción B</label>
          <input
            name="option_b"
            value={form.option_b}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Opción C</label>
          <input
            name="option_c"
            value={form.option_c}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Opción D</label>
          <input
            name="option_d"
            value={form.option_d}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Respuesta Correcta</label>
        <select
          name="correct_answer"
          value={form.correct_answer}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mt-1"
          required
        >
          <option value="">Selecciona la respuesta</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
} 