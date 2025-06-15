import { useEffect, useState, useCallback } from 'react';
import { answersService } from '../services/answersService';
import { Answer } from '../types/answer';

export default function AnswerList({ studentId }: { studentId: number }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await answersService.getAll();
      setAnswers(data.filter(a => a.student_id === studentId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener respuestas');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await answersService.create({
        student_id: studentId,
        question_id: Number(questionId),
        answer: newAnswer,
      });
      setNewAnswer('');
      setQuestionId('');
      fetchAnswers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear respuesta');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">Mis Respuestas</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <input
          type="number"
          placeholder="ID Pregunta"
          value={questionId}
          onChange={e => setQuestionId(e.target.value)}
          className="border rounded-lg px-3 py-2 w-32"
          required
        />
        <select
          value={newAnswer}
          onChange={e => setNewAnswer(e.target.value)}
          className="border rounded-lg px-3 py-2 w-32"
          required
        >
          <option value="">Respuesta</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {submitting ? 'Guardando...' : 'Responder'}
        </button>
      </form>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Cargando respuestas...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="space-y-4">
          {answers.length === 0 ? (
            <div className="text-center text-gray-400">No hay respuestas registradas.</div>
          ) : (
            answers.map(ans => (
              <div key={ans.id} className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Pregunta #{ans.question_id}:</span> <span className="text-blue-700 font-bold">{ans.answer}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  {ans.is_correct ? (
                    <span className="text-green-600 font-semibold">Correcta</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Incorrecta</span>
                  )}
                  <span className="ml-4">{new Date(ans.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 