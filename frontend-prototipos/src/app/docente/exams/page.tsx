'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ExamStatus from '../../../components/ExamStatus';
import ExamPreview from '../../../components/ExamPreview';
import { ExamService, Exam } from '../../../services/examService';

export default function DocenteExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);

  useEffect(() => {
    const loadExams = async () => {
      try {
        setLoading(true);
        // En un caso real, esto cargaría los ensayos desde la base de datos
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
            status: 'draft',
            assignedTo: ['4A', '4B']
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
          },
          {
            id: 'exam_3',
            title: 'Ensayo Ciencias - Biología #1',
            subject: 'Ciencias',
            themes: ['Biología'],
            questions: [],
            totalQuestions: 30,
            maxScore: 1000,
            estimatedTime: 90,
            difficulty: 'hard',
            createdAt: new Date().toISOString(),
            status: 'completed',
            assignedTo: ['4A', '4B', '4C']
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

  const handlePublishExam = async (examId: string) => {
    try {
      const success = await ExamService.publishExams([examId]);
      if (success) {
        // Actualizar el estado del ensayo
        setExams(prev => prev.map(exam => 
          exam.id === examId ? { ...exam, status: 'published' as const } : exam
        ));
        alert('Ensayo publicado exitosamente.');
      }
    } catch (error) {
      console.error('Error publishing exam:', error);
      alert('Error al publicar el ensayo. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEditExam = (examId: string) => {
    // En un caso real, esto abriría un editor de ensayos
    alert(`Funcionalidad de edición para el ensayo ${examId} - En desarrollo`);
  };

  const handleDeleteExam = async (examId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este ensayo? Esta acción no se puede deshacer.')) {
      try {
        const success = await ExamService.deleteExam(examId);
        if (success) {
          setExams(prev => prev.filter(exam => exam.id !== examId));
          alert('Ensayo eliminado exitosamente.');
        }
      } catch (error) {
        console.error('Error deleting exam:', error);
        alert('Error al eliminar el ensayo. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handlePreviewExam = (exam: Exam) => {
    setPreviewExam(exam);
    setShowPreview(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando ensayos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Barra de navegación */}
      <nav className="flex justify-between mb-10">
        <div>
          <Link href="/" className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all">
            Inicio
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/perfil" className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all">
            Perfil
          </Link>
          <Link href="/docente" className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all">
            Generar Ensayos
          </Link>
          <Link href="/docente/questions" className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all">
            Gestionar Preguntas
          </Link>
          <Link href="/docente/exams" className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200">
            Gestionar Ensayos
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Ensayos</h1>
              <p className="text-gray-600">
                Administra todos los ensayos generados, revisa su estado y publícalos para tus estudiantes.
              </p>
            </div>
            <Link
              href="/docente"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Generar Nuevo Ensayo
            </Link>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <ExamStatus
            exams={exams}
            onPublish={handlePublishExam}
            onEdit={handleEditExam}
            onDelete={handleDeleteExam}
            onPreview={handlePreviewExam}
          />
        </div>
      </div>

      {/* Modal de vista previa */}
      {showPreview && previewExam && (
        <ExamPreview
          exam={previewExam}
          onClose={() => setShowPreview(false)}
          onPublish={handlePublishExam}
          onEdit={handleEditExam}
        />
      )}
    </div>
  );
} 