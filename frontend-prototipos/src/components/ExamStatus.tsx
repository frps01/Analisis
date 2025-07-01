'use client';

import { useState } from 'react';
import { Exam } from '../services/examService';

interface ExamStatusProps {
  exams: Exam[];
  onPublish: (examId: string) => void;
  onEdit: (examId: string) => void;
  onDelete: (examId: string) => void;
  onPreview: (exam: Exam) => void;
}

export default function ExamStatus({ exams, onPublish, onEdit, onDelete, onPreview }: ExamStatusProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'subject'>('date');

  const filteredExams = exams.filter(exam => {
    if (filterStatus === 'all') return true;
    return exam.status === filterStatus;
  });

  const sortedExams = [...filteredExams].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'subject':
        return a.subject.localeCompare(b.subject);
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Borrador';
      case 'published': return 'Publicado';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  const stats = {
    total: exams.length,
    draft: exams.filter(e => e.status === 'draft').length,
    published: exams.filter(e => e.status === 'published').length,
    completed: exams.filter(e => e.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
          <div className="text-sm text-gray-600">Borradores</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          <div className="text-sm text-gray-600">Publicados</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completados</div>
        </div>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published' | 'completed')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borradores</option>
              <option value="published">Publicados</option>
              <option value="completed">Completados</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'subject')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="date">Fecha de creación</option>
              <option value="title">Título</option>
              <option value="subject">Materia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de ensayos */}
      <div className="space-y-4">
        {sortedExams.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ensayos</h3>
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'Aún no se han generado ensayos.'
                : `No hay ensayos con estado "${getStatusText(filterStatus)}".`
              }
            </p>
          </div>
        ) : (
          sortedExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {exam.subject}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                      {getDifficultyText(exam.difficulty)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {getStatusText(exam.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {formatDate(exam.createdAt)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Preguntas:</span>
                  <div className="font-medium">{exam.totalQuestions}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Puntaje máximo:</span>
                  <div className="font-medium">{exam.maxScore}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Tiempo estimado:</span>
                  <div className="font-medium">{exam.estimatedTime} min</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Cursos asignados:</span>
                  <div className="font-medium">{exam.assignedTo.length}</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-600">Ejes temáticos:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {exam.themes.map((theme, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onPreview(exam)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Vista Previa
                </button>
                <button
                  onClick={() => onEdit(exam.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Editar
                </button>
                {exam.status === 'draft' && (
                  <button
                    onClick={() => onPublish(exam.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Publicar
                  </button>
                )}
                <button
                  onClick={() => onDelete(exam.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 