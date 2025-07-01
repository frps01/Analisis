'use client';

import { useState, useEffect } from 'react';
import { ExamRecord } from './ExamHistory';

interface ExamProgressChartProps {
  exams: ExamRecord[];
  subject?: string;
}

export default function ExamProgressChart({ exams, subject }: ExamProgressChartProps) {
  const [filteredExams, setFilteredExams] = useState<ExamRecord[]>([]);

  useEffect(() => {
    if (subject) {
      setFilteredExams(exams.filter(exam => exam.subject === subject));
    } else {
      setFilteredExams(exams);
    }
  }, [exams, subject]);

  // Ordenar por fecha
  const sortedExams = filteredExams.sort((a, b) => 
    new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  );

  // Calcular tendencia
  const calculateTrend = () => {
    if (sortedExams.length < 2) return 'stable';
    
    const recentScores = sortedExams.slice(-3).map(exam => (exam.score / exam.maxScore) * 100);
    const olderScores = sortedExams.slice(0, 3).map(exam => (exam.score / exam.maxScore) * 100);
    
    const recentAvg = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((sum, score) => sum + score, 0) / olderScores.length;
    
    if (recentAvg > olderAvg + 5) return 'up';
    if (recentAvg < olderAvg - 5) return 'down';
    return 'stable';
  };

  const trend = calculateTrend();

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'up': return 'Mejorando';
      case 'down': return 'Necesita atención';
      default: return 'Estable';
    }
  };

  // Calcular estadísticas
  const stats = {
    total: sortedExams.length,
    completed: sortedExams.filter(e => e.status === 'completed').length,
    averageScore: sortedExams.length > 0 
      ? Math.round(sortedExams.reduce((sum, exam) => sum + exam.score, 0) / sortedExams.length)
      : 0,
    bestScore: sortedExams.length > 0 
      ? Math.max(...sortedExams.map(exam => exam.score))
      : 0,
    totalTime: sortedExams.reduce((sum, exam) => sum + exam.duration, 0)
  };

  if (sortedExams.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {subject ? `Progreso en ${subject}` : 'Progreso General'}
        </h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-500">No hay datos suficientes para mostrar el progreso</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {subject ? `Progreso en ${subject}` : 'Progreso General'}
        </h3>
        <div className={`flex items-center gap-2 ${getTrendColor()}`}>
          <span className="text-xl">{getTrendIcon()}</span>
          <span className="text-sm font-medium">{getTrendText()}</span>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Ensayos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.averageScore}</div>
          <div className="text-sm text-gray-600">Promedio</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.bestScore}</div>
          <div className="text-sm text-gray-600">Mejor</div>
        </div>
      </div>

      {/* Gráfico de progreso simple */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Evolución de Puntajes</h4>
        <div className="flex items-end gap-2 h-32">
          {sortedExams.slice(-10).map((exam, index) => {
            const percentage = (exam.score / 1000) * 100;
            const height = Math.max(20, (percentage / 100) * 100);
            const isRecent = index >= sortedExams.length - 3;
            
            return (
              <div key={exam.id} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t transition-all ${
                    isRecent ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {exam.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Últimos ensayos */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Últimos Ensayos</h4>
        <div className="space-y-2">
          {sortedExams.slice(-5).reverse().map((exam) => {
            const percentage = (exam.score / 1000) * 100;
            const date = new Date(exam.completedAt).toLocaleDateString('es-CL', {
              day: '2-digit',
              month: '2-digit'
            });
            
            return (
              <div key={exam.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{date}</span>
                  <span className="text-sm font-medium text-gray-900">{exam.theme}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${
                    percentage >= 80 ? 'text-green-600' : 
                    percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {exam.score}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                    exam.status === 'incomplete' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {exam.status === 'completed' ? '✓' : exam.status === 'incomplete' ? '⋯' : '✗'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen de tiempo */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Tiempo total de práctica:</span>
          <span className="font-medium text-gray-900">
            {Math.round(stats.totalTime / 60)} horas {stats.totalTime % 60} minutos
          </span>
        </div>
      </div>
    </div>
  );
} 