'use client';

import { useState, useEffect, useMemo } from 'react';
import { Question } from '../types/question';
import QuestionForm, { QuestionFormData } from './QuestionForm';
import QuestionFilters, { FilterOptions } from './QuestionFilters';
import QuestionStats from './QuestionStats';

const API_URL = 'http://localhost:8080/questions';

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    subject: '',
    level: '',
    searchTerm: ''
  });

  // Extraer materias y niveles únicos de las preguntas
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(questions.map(q => q.subject))];
    return uniqueSubjects.sort();
  }, [questions]);

  const levels = useMemo(() => {
    const uniqueLevels = [...new Set(questions.map(q => q.level))];
    return uniqueLevels.sort();
  }, [questions]);

  // Filtrar preguntas basado en los filtros aplicados
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Filtro por materia
      if (filters.subject && question.subject !== filters.subject) {
        return false;
      }
      
      // Filtro por nivel
      if (filters.level && question.level !== filters.level) {
        return false;
      }
      
      // Filtro por búsqueda de texto
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const statementLower = question.statement.toLowerCase();
        const optionsLower = [
          question.option_a.toLowerCase(),
          question.option_b.toLowerCase(),
          question.option_c.toLowerCase(),
          question.option_d.toLowerCase()
        ];
        
        const matchesStatement = statementLower.includes(searchLower);
        const matchesOptions = optionsLower.some(option => option.includes(searchLower));
        
        if (!matchesStatement && !matchesOptions) {
          return false;
        }
      }
      
      return true;
    });
  }, [questions, filters]);

  const hasActiveFilters = Boolean(filters.subject || filters.level || filters.searchTerm);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener preguntas: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener preguntas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditId(null);
    setShowCreateForm((prev) => !prev);
  };

  const handleEdit = (id: number) => {
    setShowCreateForm(false);
    setEditId(id);
  };

  const handleFormSubmit = async (data: QuestionFormData, isEdit: boolean, id?: number) => {
    setFormLoading(true);
    try {
      if (isEdit && id) {
        // Editar
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al actualizar pregunta');
        setEditId(null);
      } else {
        // Crear
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Error al crear pregunta');
        setShowCreateForm(false);
      }
      fetchQuestions();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al guardar pregunta');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Error al eliminar pregunta');
      setQuestions(questions.filter(q => q.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar pregunta');
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl" role="alert">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <strong className="font-semibold">Error: </strong>
            <span>{error}</span>
          </div>
          <div className="mt-4 pl-9">
            <p className="text-sm text-red-600">Por favor verifica que:</p>
            <ul className="list-disc list-inside mt-2 text-sm text-red-600">
              <li>La API está corriendo en http://localhost:8080</li>
              <li>No hay problemas de CORS</li>
              <li>La API está respondiendo correctamente</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Preguntas</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowStats(!showStats)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              showStats ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {showStats ? 'Ocultar Estadísticas' : 'Ver Estadísticas'}
          </button>
          <button
            onClick={handleCreate}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${showCreateForm ? 'bg-gray-300 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            {showCreateForm ? 'Cancelar' : 'Crear Nueva Pregunta'}
          </button>
        </div>
      </div>

      {/* Componente de estadísticas */}
      {showStats && (
        <QuestionStats
          questions={questions}
          filteredQuestions={filteredQuestions}
          hasFilters={hasActiveFilters}
        />
      )}

      {/* Componente de filtros */}
      <QuestionFilters
        onFiltersChange={handleFiltersChange}
        subjects={subjects}
        levels={levels}
      />

      {/* Información de resultados */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Mostrando {filteredQuestions.length} de {questions.length} preguntas
          {hasActiveFilters && (
            <span className="ml-2 text-blue-600">
              (filtradas)
            </span>
          )}
        </div>
      </div>

      {/* Formulario de creación */}
      {showCreateForm && (
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Crear Nueva Pregunta</h2>
          <QuestionForm
            onSubmit={(data) => handleFormSubmit(data, false)}
            onCancel={() => setShowCreateForm(false)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Lista de preguntas filtradas */}
      <div className="grid gap-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron preguntas</h3>
            <p className="text-gray-500">
              {questions.length === 0 
                ? 'No hay preguntas disponibles. Crea la primera pregunta.'
                : 'No hay preguntas que coincidan con los filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.statement}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {question.subject}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {question.level}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(question.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-500">Opciones</p>
                  <ul className="text-gray-800">
                    <li>A: {question.option_a}</li>
                    <li>B: {question.option_b}</li>
                    <li>C: {question.option_c}</li>
                    <li>D: {question.option_d}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Respuesta Correcta</p>
                  <p className="text-gray-800">{question.correct_answer}</p>
                </div>
              </div>
              {/* Formulario de edición embebido */}
              {editId === question.id && (
                <div className="mt-8 bg-gray-50 rounded-xl shadow-inner p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Editar Pregunta</h2>
                  <QuestionForm
                    initialData={question}
                    onSubmit={(data) => handleFormSubmit(data, true, question.id)}
                    onCancel={() => setEditId(null)}
                    loading={formLoading}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 