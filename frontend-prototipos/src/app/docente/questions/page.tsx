'use client';

import QuestionList from '../../../components/QuestionList';
import Link from 'next/link';

export default function QuestionsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto px-4 mb-6">
        <Link href="/docente" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-full transition-all mb-4">
          ← Volver
        </Link>
      </div>
      <QuestionList />
    </div>
  );
} 