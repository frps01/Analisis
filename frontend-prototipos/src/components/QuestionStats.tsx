'use client';

import { Question } from '../types/question';

interface QuestionStatsProps {
  questions: Question[];
  filteredQuestions: Question[];
  hasFilters: boolean;
}

export default function QuestionStats({ questions, filteredQuestions, hasFilters }: QuestionStatsProps) {
  // Calcular estadísticas
  const totalQuestions = questions.length;
  const filteredCount = filteredQuestions.length;
  
  // Estadísticas por materia
  const subjectStats = questions.reduce((acc, question) => {
    acc[question.subject] = (acc[question.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Estadísticas por nivel
  const levelStats = questions.reduce((acc, question) => {
    acc[question.level] = (acc[question.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Estadísticas de las preguntas filtradas
  const filteredSubjectStats = filteredQuestions.reduce((acc, question) => {
    acc[question.subject] = (acc[question.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const filteredLevelStats = filteredQuestions.reduce((acc, question) => {
    acc[question.level] = (acc[question.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de preguntas */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{totalQuestions}</div>
          <div className="text-sm text-gray-600">Total de preguntas</div>
        </div>
        
        {/* Preguntas filtradas */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{filteredCount}</div>
          <div className="text-sm text-gray-600">
            {hasFilters ? 'Preguntas filtradas' : 'Mostrando todas'}
          </div>
        </div>
        
        {/* Materias únicas */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{Object.keys(subjectStats).length}</div>
          <div className="text-sm text-gray-600">Materias diferentes</div>
        </div>
        
        {/* Niveles únicos */}
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{Object.keys(levelStats).length}</div>
          <div className="text-sm text-gray-600">Niveles diferentes</div>
        </div>
      </div>

      {/* Distribución por materia */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-md font-semibold text-gray-700 mb-3">Distribución por materia</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(subjectStats).map(([subject, count]) => {
            const filteredCount = filteredSubjectStats[subject] || 0;
            const percentage = totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0;
            const filteredPercentage = filteredCount > 0 ? Math.round((filteredCount / filteredCount) * 100) : 0;
            
            return (
              <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">{subject}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">
                    {hasFilters ? `${filteredCount}/${count}` : count}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hasFilters ? `${filteredPercentage}%` : `${percentage}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribución por nivel */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-md font-semibold text-gray-700 mb-3">Distribución por nivel</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(levelStats).map(([level, count]) => {
            const filteredCount = filteredLevelStats[level] || 0;
            const percentage = totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0;
            const filteredPercentage = filteredCount > 0 ? Math.round((filteredCount / filteredCount) * 100) : 0;
            
            // Color según el nivel
            const getLevelColor = (level: string) => {
              switch (level.toLowerCase()) {
                case 'fácil':
                  return 'bg-green-500';
                case 'medio':
                  return 'bg-yellow-500';
                case 'difícil':
                  return 'bg-red-500';
                default:
                  return 'bg-gray-500';
              }
            };
            
            return (
              <div key={level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${getLevelColor(level)} rounded-full`}></div>
                  <span className="font-medium text-gray-700">{level}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">
                    {hasFilters ? `${filteredCount}/${count}` : count}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hasFilters ? `${filteredPercentage}%` : `${percentage}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 