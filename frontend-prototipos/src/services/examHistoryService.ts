import { ExamRecord } from '../components/ExamHistory';

// Datos de ejemplo para el historial de ensayos
const mockExamHistory: ExamRecord[] = [
  {
    id: '1',
    subject: 'Matemática',
    theme: 'Álgebra',
    score: 850,
    maxScore: 1000,
    completedAt: '2024-03-15T14:30:00',
    duration: 45,
    correctAnswers: 17,
    totalQuestions: 20,
    status: 'completed'
  },
  {
    id: '2',
    subject: 'Lenguaje',
    theme: 'Comprensión Lectora',
    score: 720,
    maxScore: 1000,
    completedAt: '2024-03-14T10:15:00',
    duration: 60,
    correctAnswers: 18,
    totalQuestions: 25,
    status: 'completed'
  },
  {
    id: '3',
    subject: 'Ciencias',
    theme: 'Biología',
    score: 900,
    maxScore: 1000,
    completedAt: '2024-03-13T16:45:00',
    duration: 50,
    correctAnswers: 18,
    totalQuestions: 20,
    status: 'completed'
  },
  {
    id: '4',
    subject: 'Historia',
    theme: 'Historia de Chile',
    score: 650,
    maxScore: 1000,
    completedAt: '2024-03-12T09:20:00',
    duration: 40,
    correctAnswers: 13,
    totalQuestions: 20,
    status: 'completed'
  },
  {
    id: '5',
    subject: 'Matemática',
    theme: 'Geometría',
    score: 780,
    maxScore: 1000,
    completedAt: '2024-03-11T15:30:00',
    duration: 55,
    correctAnswers: 15,
    totalQuestions: 20,
    status: 'completed'
  },
  {
    id: '6',
    subject: 'Lenguaje',
    theme: 'Gramática',
    score: 0,
    maxScore: 1000,
    completedAt: '2024-03-10T11:00:00',
    duration: 15,
    correctAnswers: 0,
    totalQuestions: 20,
    status: 'abandoned'
  },
  {
    id: '7',
    subject: 'Ciencias',
    theme: 'Física',
    score: 450,
    maxScore: 1000,
    completedAt: '2024-03-09T14:20:00',
    duration: 30,
    correctAnswers: 9,
    totalQuestions: 20,
    status: 'incomplete'
  },
  {
    id: '8',
    subject: 'Matemática',
    theme: 'Trigonometría',
    score: 880,
    maxScore: 1000,
    completedAt: '2024-03-08T13:45:00',
    duration: 65,
    correctAnswers: 17,
    totalQuestions: 20,
    status: 'completed'
  },
  {
    id: '9',
    subject: 'Lenguaje',
    theme: 'Literatura',
    score: 820,
    maxScore: 1000,
    completedAt: '2024-03-07T16:20:00',
    duration: 55,
    correctAnswers: 20,
    totalQuestions: 25,
    status: 'completed'
  },
  {
    id: '10',
    subject: 'Historia',
    theme: 'Historia Universal',
    score: 700,
    maxScore: 1000,
    completedAt: '2024-03-06T10:30:00',
    duration: 45,
    correctAnswers: 14,
    totalQuestions: 20,
    status: 'completed'
  }
];

export interface ExamStats {
  total: number;
  completed: number;
  incomplete: number;
  abandoned: number;
  averageScore: number;
  bestScore: number;
  totalTime: number; // en minutos
  subjects: {
    [subject: string]: {
      count: number;
      averageScore: number;
      bestScore: number;
    };
  };
}

export class ExamHistoryService {
  // Obtener todo el historial
  static async getExamHistory(): Promise<ExamRecord[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExamHistory;
  }

  // Obtener estadísticas del historial
  static async getExamStats(): Promise<ExamStats> {
    const exams = await this.getExamHistory();
    
    const stats: ExamStats = {
      total: exams.length,
      completed: exams.filter(e => e.status === 'completed').length,
      incomplete: exams.filter(e => e.status === 'incomplete').length,
      abandoned: exams.filter(e => e.status === 'abandoned').length,
      averageScore: 0,
      bestScore: 0,
      totalTime: 0,
      subjects: {}
    };

    if (exams.length > 0) {
      // Calcular puntajes promedio y mejor
      const scores = exams.map(exam => (exam.score / exam.maxScore) * 100);
      stats.averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      stats.bestScore = Math.round(Math.max(...scores));
      stats.totalTime = exams.reduce((sum, exam) => sum + exam.duration, 0);

      // Calcular estadísticas por materia
      const subjectGroups = exams.reduce((groups, exam) => {
        if (!groups[exam.subject]) {
          groups[exam.subject] = [];
        }
        groups[exam.subject].push(exam);
        return groups;
      }, {} as { [key: string]: ExamRecord[] });

      Object.entries(subjectGroups).forEach(([subject, subjectExams]) => {
        const subjectScores = subjectExams.map(exam => exam.score);
        stats.subjects[subject] = {
          count: subjectExams.length,
          averageScore: Math.round(subjectScores.reduce((sum, score) => sum + score, 0) / subjectScores.length),
          bestScore: Math.max(...subjectScores)
        };
      });
    }

    return stats;
  }

  // Filtrar ensayos por criterios
  static async filterExams(filters: {
    subject?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    minScore?: number;
  }): Promise<ExamRecord[]> {
    const exams = await this.getExamHistory();
    
    return exams.filter(exam => {
      if (filters.subject && exam.subject !== filters.subject) return false;
      if (filters.status && exam.status !== filters.status) return false;
      if (filters.minScore && (exam.score / exam.maxScore) * 100 < filters.minScore) return false;
      if (filters.dateFrom && new Date(exam.completedAt) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(exam.completedAt) > new Date(filters.dateTo)) return false;
      return true;
    });
  }

  // Obtener ensayos recientes (últimos N)
  static async getRecentExams(limit: number = 5): Promise<ExamRecord[]> {
    const exams = await this.getExamHistory();
    return exams
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, limit);
  }

  // Obtener progreso por materia
  static async getSubjectProgress(): Promise<{
    [subject: string]: {
      totalExams: number;
      averageScore: number;
      trend: 'up' | 'down' | 'stable';
    };
  }> {
    const exams = await this.getExamHistory();
    const subjectGroups = exams.reduce((groups, exam) => {
      if (!groups[exam.subject]) {
        groups[exam.subject] = [];
      }
      groups[exam.subject].push(exam);
      return groups;
    }, {} as { [key: string]: ExamRecord[] });

    const progress: { [subject: string]: {
      totalExams: number;
      averageScore: number;
      trend: 'up' | 'down' | 'stable';
    }} = {};

    Object.entries(subjectGroups).forEach(([subject, subjectExams]) => {
      const sortedExams = subjectExams.sort((a, b) => 
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
      );
      
      const scores = sortedExams.map(exam => exam.score);
      const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      
      // Calcular tendencia (comparar primeros 3 vs últimos 3)
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (scores.length >= 6) {
        const firstHalf = scores.slice(0, 3).reduce((sum, score) => sum + score, 0) / 3;
        const secondHalf = scores.slice(-3).reduce((sum, score) => sum + score, 0) / 3;
        if (secondHalf > firstHalf + 50) trend = 'up';
        else if (secondHalf < firstHalf - 50) trend = 'down';
      }

      progress[subject] = {
        totalExams: subjectExams.length,
        averageScore,
        trend
      };
    });

    return progress;
  }
} 