'use client';

import { useState } from 'react';
import { Exam } from '../services/examService';

interface ExamPreviewProps {
  exam: Exam;
  onClose: () => void;
  onPublish: (examId: string) => void;
  onEdit: (examId: string) => void;
}

export default function ExamPreview({ exam, onClose, onPublish, onEdit }: ExamPreviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const nextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = exam.questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vista Previa del Ensayo</h2>
              <p className="text-blue-100">{exam.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar con información */}
          <div className="w-80 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
              {/* Información general */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Información General</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materia:</span>
                    <span className="font-medium">{exam.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preguntas:</span>
                    <span className="font-medium">{exam.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Puntaje máximo:</span>
                    <span className="font-medium">{exam.maxScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo estimado:</span>
                    <span className="font-medium">{exam.estimatedTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dificultad:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                      {getDifficultyText(exam.difficulty)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Creado:</span>
                    <span className="font-medium">{formatDate(exam.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Temas */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Ejes Temáticos</h3>
                <div className="flex flex-wrap gap-2">
                  {exam.themes.map((theme, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cursos asignados */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Cursos Asignados</h3>
                <div className="space-y-1">
                  {exam.assignedTo.map((curso, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      • {curso}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navegación de preguntas */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Navegación</h3>
                <div className="grid grid-cols-5 gap-2">
                  {exam.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                        index === currentQuestion
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controles */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    showAnswers
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showAnswers ? 'Ocultar Respuestas' : 'Mostrar Respuestas'}
                </button>
              </div>
            </div>
          </div>

          {/* Área de pregunta */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              {/* Navegación de pregunta */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Anterior
                </button>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600">Pregunta</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentQuestion + 1} de {exam.questions.length}
                  </div>
                </div>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === exam.questions.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestion === exam.questions.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Siguiente
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Pregunta */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                    {getDifficultyText(question.difficulty)}
                  </span>
                  <span className="text-sm text-gray-500">Tema: {question.theme}</span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  {question.question}
                </h3>
                
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        showAnswers && index === question.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : showAnswers
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          showAnswers && index === question.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {showAnswers && index === question.correctAnswer && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {showAnswers && question.explanation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Explicación:</h4>
                    <p className="text-blue-800 text-sm">{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Estado: <span className="font-medium text-gray-900">{exam.status}</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(exam.id)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onPublish(exam.id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Publicar Ensayo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 