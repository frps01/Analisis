'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import ThemeSelector from '../../components/ThemeSelector';
import ExamPreview from '../../components/ExamPreview';
import { ExamService, Exam, ExamGenerationRequest } from '../../services/examService';

export default function DocentePage() {
  const [numEnsayos, setNumEnsayos] = useState('');
  const [selectedAsignatura, setSelectedAsignatura] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedCursos, setSelectedCursos] = useState<string[]>([]);
  const [generatedExams, setGeneratedExams] = useState<Exam[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Lista de cursos disponibles
  const cursosDisponibles = [
    { id: '4A', nombre: '4° Medio A' },
    { id: '4B', nombre: '4° Medio B' },
    { id: '4C', nombre: '4° Medio C' },
    { id: '4D', nombre: '4° Medio D' },
    { id: '4E', nombre: '4° Medio E' },
    { id: '4F', nombre: '4° Medio F' },
    { id: '3A', nombre: '3° Medio A' },
    { id: '3B', nombre: '3° Medio B' },
    { id: '3C', nombre: '3° Medio C' },
    { id: '3D', nombre: '3° Medio D' },
    { id: '3E', nombre: '3° Medio E' },
    { id: '3F', nombre: '3° Medio F' },
  ];
  
  const toggleCurso = (cursoId: string) => {
    if (selectedCursos.includes(cursoId)) {
      setSelectedCursos(selectedCursos.filter(id => id !== cursoId));
    } else {
      setSelectedCursos([...selectedCursos, cursoId]);
    }
  };
  
  const selectAllCursos = () => {
    if (selectedCursos.length === cursosDisponibles.length) {
      setSelectedCursos([]);
    } else {
      setSelectedCursos(cursosDisponibles.map(curso => curso.id));
    }
  };

  const handleAsignaturaChange = (asignatura: string) => {
    setSelectedAsignatura(asignatura);
    // Limpiar ejes temáticos cuando cambia la asignatura
    setSelectedThemes([]);
  };

  const handleThemesChange = (themes: string[]) => {
    setSelectedThemes(themes);
  };

  // Verificar si se puede generar el ensayo
  const canGenerate = selectedAsignatura && selectedCursos.length > 0 && numEnsayos && selectedThemes.length > 0;

  // Generar ensayos
  const handleGenerateExams = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    try {
      const request: ExamGenerationRequest = {
        numExams: parseInt(numEnsayos),
        courses: selectedCursos,
        subject: selectedAsignatura,
        themes: selectedThemes
      };

      const exams = await ExamService.generateExams(request);
      setGeneratedExams(exams);
      setShowSuccess(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating exams:', error);
      alert('Error al generar los ensayos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Visualizar ensayo
  const handleVisualize = async () => {
    if (generatedExams.length === 0) {
      alert('Primero debes generar al menos un ensayo para poder visualizarlo.');
      return;
    }

    // Usar el primer ensayo generado para la vista previa
    setPreviewExam(generatedExams[0]);
    setShowPreview(true);
  };

  // Publicar ensayo
  const handlePublishExam = async (examId: string) => {
    try {
      const success = await ExamService.publishExams([examId]);
      if (success) {
        alert('Ensayo publicado exitosamente. Los estudiantes ya pueden acceder a él.');
        setShowPreview(false);
        // Actualizar el estado del ensayo
        setGeneratedExams(prev => prev.map(exam => 
          exam.id === examId ? { ...exam, status: 'published' as const } : exam
        ));
      }
    } catch (error) {
      console.error('Error publishing exam:', error);
      alert('Error al publicar el ensayo. Por favor, inténtalo de nuevo.');
    }
  };

  // Editar ensayo
  const handleEditExam = (examId: string) => {
    // En un caso real, esto abriría un editor de ensayos
    alert(`Funcionalidad de edición para el ensayo ${examId} - En desarrollo`);
  };

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
          <Link href="/docente/questions" className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200">
            Gestionar Preguntas
          </Link>
          <Link href="/docente/exams" className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200">
            Gestionar Ensayos
          </Link>
          <Link href="/docente" className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200">
            Docente
          </Link>
        </div>
      </nav>

      <div className="bg-white rounded-xl p-8 max-w-7xl mx-auto shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-8 text-gray-700 text-center">Panel de Configuración de Ensayos</h2>
        
        {/* Primera fila: Configuración básica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Número de ensayos */}
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-medium mb-2">Nº Ensayos</div>
            <input 
              type="number" 
              value={numEnsayos}
              onChange={(e) => setNumEnsayos(e.target.value)}
              className="w-40 h-12 border rounded-lg px-4 text-center focus:ring-2 focus:ring-blue-200"
              placeholder="Cantidad"
              min={1}
            />
          </div>
          
          {/* Cursos */}
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-medium mb-2">Cursos</div>
            <div className="w-full max-w-xs border rounded-lg p-3 bg-white max-h-48 overflow-y-auto">
              <div className="flex items-center mb-2 pb-2 border-b">
                <button 
                  onClick={selectAllCursos}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between text-sm"
                >
                  <span>Seleccionar todos</span>
                  <span className={`w-5 h-5 border rounded ${selectedCursos.length === cursosDisponibles.length ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                    {selectedCursos.length === cursosDisponibles.length && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
              <div className="space-y-1">
                {cursosDisponibles.map(curso => (
                  <div key={curso.id} className="flex items-center">
                    <button 
                      onClick={() => toggleCurso(curso.id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between text-sm"
                    >
                      <span>{curso.nombre}</span>
                      <span className={`w-5 h-5 border rounded ${selectedCursos.includes(curso.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {selectedCursos.includes(curso.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Asignatura */}
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-medium mb-2">Asignatura</div>
            <div className="w-full max-w-xs">
              <div className="space-y-2">
                {['Matemática', 'Lenguaje', 'Ciencias', 'Historia'].map((asignatura) => (
                  <button
                    key={asignatura}
                    onClick={() => handleAsignaturaChange(asignatura)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                      selectedAsignatura === asignatura 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      selectedAsignatura === asignatura ? 'bg-white' : 'bg-gray-400'
                    }`}></div>
                    <span>{asignatura}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Segunda fila: Ejes temáticos */}
        <div className="mb-8">
          <ThemeSelector
            selectedSubject={selectedAsignatura}
            selectedThemes={selectedThemes}
            onThemesChange={handleThemesChange}
          />
        </div>

        {/* Resumen de configuración */}
        {canGenerate && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Resumen de Configuración:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• {numEnsayos} ensayo(s) para {selectedCursos.length} curso(s)</p>
              <p>• Asignatura: {selectedAsignatura}</p>
              <p>• Ejes temáticos: {selectedThemes.length} seleccionado(s)</p>
            </div>
          </div>
        )}

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-green-800">¡Ensayos generados exitosamente!</h3>
                <p className="text-sm text-green-700">Se han generado {generatedExams.length} ensayo(s). Usa &quot;Visualizar&quot; para revisarlos antes de publicar.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Botones */}
        <div className="flex justify-center gap-8">
          <button 
            onClick={handleGenerateExams}
            disabled={!canGenerate || isGenerating}
            className={`px-8 py-3 rounded-lg font-semibold w-40 transition-all flex items-center justify-center gap-2 ${
              canGenerate && !isGenerating
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generando...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Generar Ensayos
              </>
            )}
          </button>
          <button 
            onClick={handleVisualize}
            disabled={generatedExams.length === 0}
            className={`px-8 py-3 rounded-lg font-semibold w-40 transition-all flex items-center justify-center gap-2 ${
              generatedExams.length > 0
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Visualizar
          </button>
        </div>

        {/* Lista de ensayos generados */}
        {generatedExams.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ensayos Generados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedExams.map((exam) => (
                <div key={exam.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">{exam.title}</h4>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>• {exam.totalQuestions} preguntas</p>
                    <p>• Puntaje máximo: {exam.maxScore}</p>
                    <p>• Tiempo: {exam.estimatedTime} min</p>
                    <p>• Estado: <span className={`font-medium ${
                      exam.status === 'draft' ? 'text-yellow-600' : 
                      exam.status === 'published' ? 'text-green-600' : 'text-gray-600'
                    }`}>{exam.status}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPreviewExam(exam);
                        setShowPreview(true);
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ver
                    </button>
                    {exam.status === 'draft' && (
                      <button
                        onClick={() => handlePublishExam(exam.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Publicar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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