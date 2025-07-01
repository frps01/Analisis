'use client';

import { useState, useEffect } from 'react';
import { Exam } from '../services/examService';

export default function StudentExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExams = async () => {
      try {
        setLoading(true);
        // En un caso real, esto llamaría al servicio
        const mockExams: Exam[] = [
          {
            id: 'exam_1',
            title: 'Ensayo Matemática - Álgebra #1',
            subject: 'Matemática',
            themes: ['Álgebra'],
            questions: [],
            totalQuestions: 20,
            maxScore: 1000,
            estimatedTime: 60,
            difficulty: 'medium',
            createdAt: new Date().toISOString(),
            status: 'published',
            assignedTo: ['4A']
          },
          {
            id: 'exam_2',
            title: 'Ensayo Lenguaje - Comprensión Lectora #1',
            subject: 'Lenguaje',
            themes: ['Comprensión Lectora'],
            questions: [],
            totalQuestions: 25,
            maxScore: 1000,
            estimatedTime: 75,
            difficulty: 'medium',
            createdAt: new Date().toISOString(),
            status: 'published',
            assignedTo: ['4A']
          }
        ];
        setExams(mockExams);
      } catch (error) {
        console.error('Error loading exams:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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

  const startExam = (exam: Exam) => {
    // En un caso real, esto redirigiría al examen
    console.log('Iniciando examen:', exam.id);
    alert(`Iniciando examen: ${exam.title}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando ensayos...</p>
        </div>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ensayos disponibles</h3>
        <p className="text-gray-500">
          Tu profesor aún no ha asignado ningún ensayo para tu curso.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Ensayos Disponibles</h2>
        <div className="text-sm text-gray-500">
          {exams.length} ensayo(s) disponible(s)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {exam.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {exam.subject}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                    {getDifficultyText(exam.difficulty)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Preguntas:</span>
                <span className="font-medium">{exam.totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Puntaje máximo:</span>
                <span className="font-medium">{exam.maxScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tiempo estimado:</span>
                <span className="font-medium">{exam.estimatedTime} min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Asignado:</span>
                <span className="font-medium">{formatDate(exam.createdAt)}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ejes temáticos:</h4>
              <div className="flex flex-wrap gap-1">
                {exam.themes.map((theme, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => startExam(exam)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Iniciar Ensayo
            </button>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Información importante</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Asegúrate de tener tiempo suficiente antes de iniciar un ensayo</li>
              <li>• Una vez iniciado, el tiempo comenzará a correr automáticamente</li>
              <li>• Puedes pausar el ensayo, pero el tiempo seguirá contando</li>
              <li>• Revisa bien tus respuestas antes de finalizar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 