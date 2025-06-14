'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function DocentePage() {
  const [numEnsayos, setNumEnsayos] = useState('');
  const [selectedAsignatura, setSelectedAsignatura] = useState('');
  
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
  
  const [selectedCursos, setSelectedCursos] = useState<string[]>([]);
  
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
          <Link href="/docente" className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200">
            Docente
          </Link>
        </div>
      </nav>

      <div className="bg-white rounded-xl p-8 max-w-5xl mx-auto shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-8 text-gray-700 text-center">Panel de Configuración</h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Columna izquierda - Número de ensayos */}
          <div className="flex-1 flex flex-col items-center">
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
          
          {/* Columna central - Curso (Selección múltiple) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="text-gray-600 font-medium mb-2">Cursos</div>
            <div className="w-full max-w-xs border rounded-lg p-3 bg-white max-h-64 overflow-y-auto">
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
          
          {/* Columna derecha - Seleccionar asignatura (Botones) */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 className="text-base font-medium mb-4 text-center text-gray-700">Seleccionar Asignatura</h3>
              <div className="space-y-3">
                {['Matemática', 'Lenguaje', 'Ciencias', 'Historia'].map((asignatura) => (
                  <button
                    key={asignatura}
                    onClick={() => setSelectedAsignatura(asignatura)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center text-sm font-medium ${
                      selectedAsignatura === asignatura 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      selectedAsignatura === asignatura ? 'bg-white' : 'bg-gray-300'
                    }`}></div>
                    <span>{asignatura}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex justify-center gap-8 mt-8">
          <button 
            className={`px-8 py-3 rounded-lg font-semibold w-40 transition-all ${
              selectedAsignatura && selectedCursos.length > 0 && numEnsayos
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedAsignatura || selectedCursos.length === 0 || !numEnsayos}
          >
            Generar
          </button>
          <button className="px-8 py-3 rounded-lg font-semibold w-40 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">
            Visualizar
          </button>
        </div>
      </div>
    </div>
  );
} 