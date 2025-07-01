export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  themes: string[];
  questions: ExamQuestion[];
  totalQuestions: number;
  maxScore: number;
  estimatedTime: number; // en minutos
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  status: 'draft' | 'published' | 'completed';
  assignedTo: string[]; // IDs de cursos
}

export interface ExamGenerationRequest {
  numExams: number;
  courses: string[];
  subject: string;
  themes: string[];
}

export interface ExamPreview {
  exam: Exam;
  previewQuestions: ExamQuestion[];
}

export class ExamService {
  // Generar ensayos basados en la configuración
  static async generateExams(request: ExamGenerationRequest): Promise<Exam[]> {
    // Simular delay de generación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exams: Exam[] = [];
    
    for (let i = 0; i < request.numExams; i++) {
      const exam: Exam = {
        id: `exam_${Date.now()}_${i}`,
        title: `Ensayo ${request.subject} - ${request.themes.join(', ')} #${i + 1}`,
        subject: request.subject,
        themes: request.themes,
        questions: this.generateQuestions(request.subject, request.themes),
        totalQuestions: 20,
        maxScore: 1000,
        estimatedTime: 60,
        difficulty: 'medium',
        createdAt: new Date().toISOString(),
        status: 'draft',
        assignedTo: request.courses
      };
      
      exams.push(exam);
    }
    
    return exams;
  }

  // Generar preguntas de ejemplo basadas en materia y temas
  private static generateQuestions(subject: string, themes: string[]): ExamQuestion[] {
    const questions: ExamQuestion[] = [];
    
    // Preguntas de ejemplo por materia
    const questionTemplates = {
      'Matemática': [
        {
          question: '¿Cuál es el resultado de la ecuación 2x + 5 = 13?',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
          correctAnswer: 1,
          difficulty: 'easy' as const
        },
        {
          question: 'En un triángulo rectángulo, si los catetos miden 3 y 4, ¿cuál es la hipotenusa?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 0,
          difficulty: 'medium' as const
        },
        {
          question: '¿Cuál es el área de un círculo con radio 5?',
          options: ['25π', '50π', '75π', '100π'],
          correctAnswer: 0,
          difficulty: 'medium' as const
        }
      ],
      'Lenguaje': [
        {
          question: '¿Cuál es la función del sustantivo en la oración "El libro está sobre la mesa"?',
          options: ['Sujeto', 'Predicado', 'Complemento directo', 'Complemento circunstancial'],
          correctAnswer: 0,
          difficulty: 'easy' as const
        },
        {
          question: '¿Qué figura literaria predomina en "El viento susurraba entre los árboles"?',
          options: ['Metáfora', 'Personificación', 'Hipérbole', 'Comparación'],
          correctAnswer: 1,
          difficulty: 'medium' as const
        },
        {
          question: '¿Cuál es el tema principal del texto leído?',
          options: ['La tecnología moderna', 'La importancia de la educación', 'El cambio climático', 'La globalización'],
          correctAnswer: 1,
          difficulty: 'hard' as const
        }
      ],
      'Ciencias': [
        {
          question: '¿Qué proceso convierte la energía solar en energía química?',
          options: ['Respiración', 'Fotosíntesis', 'Fermentación', 'Digestión'],
          correctAnswer: 1,
          difficulty: 'easy' as const
        },
        {
          question: '¿Cuál es la fórmula química del agua?',
          options: ['H2O', 'CO2', 'O2', 'N2'],
          correctAnswer: 0,
          difficulty: 'easy' as const
        },
        {
          question: '¿Qué ley establece que la energía no se crea ni se destruye?',
          options: ['Ley de Newton', 'Ley de la conservación de la energía', 'Ley de Ohm', 'Ley de Boyle'],
          correctAnswer: 1,
          difficulty: 'medium' as const
        }
      ],
      'Historia': [
        {
          question: '¿En qué año comenzó la Independencia de Chile?',
          options: ['1810', '1818', '1820', '1825'],
          correctAnswer: 0,
          difficulty: 'easy' as const
        },
        {
          question: '¿Quién fue el primer presidente de Chile?',
          options: ['Bernardo O\'Higgins', 'Manuel Blanco Encalada', 'José Miguel Carrera', 'José Joaquín Prieto'],
          correctAnswer: 1,
          difficulty: 'medium' as const
        },
        {
          question: '¿Qué período histórico siguió a la Independencia?',
          options: ['Colonia', 'República Conservadora', 'República Liberal', 'República Parlamentaria'],
          correctAnswer: 1,
          difficulty: 'hard' as const
        }
      ]
    };

    const templates = questionTemplates[subject as keyof typeof questionTemplates] || questionTemplates['Matemática'];
    
    // Generar 20 preguntas mezclando las plantillas
    for (let i = 0; i < 20; i++) {
      const template = templates[i % templates.length];
      const question: ExamQuestion = {
        id: `q_${Date.now()}_${i}`,
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
        explanation: `Explicación para la pregunta ${i + 1}`,
        difficulty: template.difficulty,
        theme: themes[i % themes.length] || themes[0]
      };
      questions.push(question);
    }
    
    return questions;
  }

  // Obtener vista previa de un ensayo
  static async getExamPreview(examId: string): Promise<ExamPreview> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // En un caso real, esto vendría de la base de datos
    const exam: Exam = {
      id: examId,
      title: 'Ensayo de Prueba',
      subject: 'Matemática',
      themes: ['Álgebra', 'Geometría'],
      questions: this.generateQuestions('Matemática', ['Álgebra', 'Geometría']),
      totalQuestions: 20,
      maxScore: 1000,
      estimatedTime: 60,
      difficulty: 'medium',
      createdAt: new Date().toISOString(),
      status: 'draft',
      assignedTo: ['4A', '4B']
    };
    
    return {
      exam,
      previewQuestions: exam.questions.slice(0, 5) // Mostrar solo las primeras 5 preguntas
    };
  }

  // Publicar ensayos (enviar a estudiantes)
  static async publishExams(examIds: string[]): Promise<boolean> {
    // Simular delay de publicación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // En un caso real, esto actualizaría el estado de los ensayos
    // y los haría disponibles para los estudiantes
    console.log('Publicando ensayos:', examIds);
    
    return true;
  }

  // Obtener ensayos asignados a un estudiante
  static async getStudentExams(): Promise<Exam[]> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // En un caso real, esto consultaría la base de datos
    // para obtener los ensayos asignados al estudiante
    return [
      {
        id: 'exam_1',
        title: 'Ensayo Matemática - Álgebra #1',
        subject: 'Matemática',
        themes: ['Álgebra'],
        questions: this.generateQuestions('Matemática', ['Álgebra']),
        totalQuestions: 20,
        maxScore: 1000,
        estimatedTime: 60,
        difficulty: 'medium',
        createdAt: new Date().toISOString(),
        status: 'published',
        assignedTo: ['4A']
      }
    ];
  }

  // Guardar ensayo como borrador
  static async saveDraft(exam: Exam): Promise<boolean> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Guardando borrador:', exam);
    return true;
  }

  // Eliminar ensayo
  static async deleteExam(examId: string): Promise<boolean> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Eliminando ensayo:', examId);
    return true;
  }
} 