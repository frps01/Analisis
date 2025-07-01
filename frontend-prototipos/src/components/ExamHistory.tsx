'use client';

import { useState, useMemo } from 'react';

export interface ExamRecord {
  id: string;
  subject: string;
  theme: string;
  score: number;
  maxScore: number;
  completedAt: string;
  duration: number; // en minutos
  correctAnswers: number;
  totalQuestions: number;
  status: 'completed' | 'incomplete' | 'abandoned';
}

interface ExamHistoryProps {
  exams: ExamRecord[];
}

export default function ExamHistory({ exams }: ExamHistoryProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'subject'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Obtener materias únicas
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(exams.map(exam => exam.subject))];
    return uniqueSubjects.sort();
  }, [exams]);

  // Filtrar y ordenar ensayos
  const filteredAndSortedExams = useMemo(() => {
    const filtered = exams.filter(exam => {
      if (selectedSubject && exam.subject !== selectedSubject) return false;
      if (selectedStatus && exam.status !== selectedStatus) return false;
      return true;
    });

    // Crear una copia para ordenar
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
          break;
        case 'score':
          comparison = (a.score / a.maxScore) - (b.score / b.maxScore);
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [exams, selectedSubject, selectedStatus, sortBy, sortOrder]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = exams.length;
    const completed = exams.filter(e => e.status === 'completed').length;
    const averageScore = exams.length > 0 
      ? exams.reduce((sum, exam) => sum + exam.score, 0) / exams.length
      : 0;
    const bestScore = exams.length > 0 
      ? Math.max(...exams.map(exam => exam.score))
      : 0;

    return { total, completed, averageScore: Math.round(averageScore), bestScore };
  }, [exams]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'incomplete': return 'bg-yellow-100 text-yellow-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'incomplete': return 'Incompleto';
      case 'abandoned': return 'Abandonado';
      default: return status;
    }
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / 1000) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedStatus('');
  };

  const hasActiveFilters = selectedSubject || selectedStatus;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Historial de Ensayos</h2>
        <div className="text-sm text-gray-500">
          {filteredAndSortedExams.length} de {exams.length} ensayos
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-700">Total Ensayos</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-700">Completados</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.averageScore}</div>
          <div className="text-sm text-purple-700">Promedio</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.bestScore}</div>
          <div className="text-sm text-yellow-700">Mejor Puntaje</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Materia</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las materias</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="completed">Completado</option>
              <option value="incomplete">Incompleto</option>
              <option value="abandoned">Abandonado</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy as 'date' | 'score' | 'subject');
                setSortOrder(newSortOrder as 'asc' | 'desc');
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">Fecha (más reciente)</option>
              <option value="date-asc">Fecha (más antigua)</option>
              <option value="score-desc">Puntaje (mayor)</option>
              <option value="score-asc">Puntaje (menor)</option>
              <option value="subject-asc">Materia (A-Z)</option>
            </select>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedSubject && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Materia: {selectedSubject}
                  <button
                    onClick={() => setSelectedSubject('')}
                    className="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedStatus && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Estado: {getStatusText(selectedStatus)}
                  <button
                    onClick={() => setSelectedStatus('')}
                    className="ml-1 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Lista de ensayos */}
      <div className="space-y-4">
        {filteredAndSortedExams.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron ensayos</h3>
            <p className="text-gray-500">
              {exams.length === 0 
                ? 'Aún no has realizado ningún ensayo.'
                : 'No hay ensayos que coincidan con los filtros aplicados.'
              }
            </p>
          </div>
        ) : (
          filteredAndSortedExams.map((exam) => {
            const percentage = (exam.score / exam.maxScore) * 100;
            return (
              <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{exam.theme}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span>📅 {formatDate(exam.completedAt)}</span>
                      <span>⏱️ {exam.duration} min</span>
                      <span>✅ {exam.correctAnswers}/{exam.totalQuestions} correctas</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(exam.score)}`}>
                        {Math.round(percentage)}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {exam.score}/{exam.maxScore} puntos
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                      {getStatusText(exam.status)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
} 