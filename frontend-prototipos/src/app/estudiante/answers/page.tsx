'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useParams } from 'next/navigation';

interface Answer {
  id: number;
  student_id: number;
  question_id: number;
  statement: string;
  answer: string;
  is_correct: boolean;
  created_at: string;
}

export default function AnswersPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const params = useParams();
  // const studentId = Number(params.id);
  const studentId = 1; // Hardcodeado para pruebas

  useEffect(() => {
    fetchAnswers();
  }, [studentId]);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/answers/student/${studentId}`);
      if (!response.ok) {
        throw new Error('Error al obtener respuestas');
      }
      const data = await response.json();
      setAnswers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener respuestas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando respuestas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl" role="alert">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mis Respuestas</h1>
        <Link
          href="/estudiante"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
        >
          Volver
        </Link>
      </div>
      
      {answers.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No hay respuestas registradas.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {answers.map((answer) => (
            <div key={answer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{answer.statement}</h2>
                  <p className="text-gray-600 mt-1">Tu respuesta: <span className="font-bold">{answer.answer}</span></p>
                </div>
                <div className="flex items-center">
                  {answer.is_correct ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Correcta
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Incorrecta
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(answer.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 