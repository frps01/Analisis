export interface Answer {
  id: number;
  student_id: number;
  question_id: number;
  answer: string;
  is_correct: boolean;
  created_at: string;
} 