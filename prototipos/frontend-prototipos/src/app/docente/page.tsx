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
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Barra de navegación */}
      <nav className="flex justify-between mb-10">
        <div>
          <Link href="/" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Inicio
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/perfil" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Perfil
          </Link>
          <Link href="/docente" className="bg-blue-300 px-8 py-3 rounded-full text-black font-bold">
            Docente
          </Link>
        </div>
      </nav>

      {/* Panel de configuración */}
      <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto shadow-md">
        <h2 className="text-2xl font-bold mb-10 text-center">Panel De Configuración</h2>
        
        <div className="flex flex-col md:flex-row mb-10 gap-6">
          {/* Columna izquierda - Número de ensayos */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold mb-4 w-40 text-center">
              Nº Ensayos
            </div>
            <input 
              type="text" 
              value={numEnsayos}
              onChange={(e) => setNumEnsayos(e.target.value)}
              className="w-52 h-12 border rounded-lg px-4"
            />
          </div>
          
          {/* Columna central - Curso (Selección múltiple) */}
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold mb-4 w-40 text-center">
              Cursos
            </div>
            <div className="w-full max-w-xs border rounded-lg p-3 bg-white max-h-64 overflow-y-auto">
              <div className="flex items-center mb-2 pb-2 border-b">
                <button 
                  onClick={selectAllCursos}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
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
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between"
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
              <h3 className="text-lg font-medium mb-4 text-center">Seleccionar Asignatura</h3>
              <div className="space-y-3">
                {['Matematicas', 'Lenguaje', 'Ciencias', 'Historia'].map((asignatura) => (
                  <button
                    key={asignatura}
                    onClick={() => setSelectedAsignatura(asignatura)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center ${
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
        <div className="flex justify-center gap-8 mt-10">
          <button 
            className={`bg-gray-400 px-8 py-3 rounded-full text-black font-bold w-40 transition-all ${
              selectedAsignatura && selectedCursos.length > 0 && numEnsayos
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'opacity-70 cursor-not-allowed'
            }`}
            disabled={!selectedAsignatura || selectedCursos.length === 0 || !numEnsayos}
          >
            Generar
          </button>
          <button className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold w-40 hover:bg-gray-500 transition-colors">
            Visualizar
          </button>
        </div>
      </div>
    </div>
  );
} 