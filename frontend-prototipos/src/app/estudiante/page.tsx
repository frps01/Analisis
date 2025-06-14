'use client';
import Link from 'next/link';
import React from 'react';

export default function EstudiantePage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Barra de navegación */}
      <nav className="flex justify-between mb-10">
        <div>
          <Link 
            href="/" 
            className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all"
          >
            Inicio
          </Link>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/perfil" 
            className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-full text-gray-800 font-semibold transition-all"
          >
            Perfil
          </Link>
          <Link 
            href="/estudiante" 
            className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-full text-blue-700 font-semibold transition-all border border-blue-200"
          >
            Estudiante
          </Link>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row justify-between gap-10 max-w-5xl mx-auto">
        {/* Puntaje promedio */}
        <div className="flex flex-col items-center md:w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Puntaje Promedio</h2>
          <div className="flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-tr from-blue-100 to-green-100 border-2 border-blue-200">
            <span className="text-5xl font-bold text-blue-700">850</span>
          </div>
          <p className="mt-4 text-gray-500 text-center text-sm">Basado en tus últimos 10 ensayos</p>
        </div>

        {/* Panel de asignaturas */}
        <div className="bg-white rounded-xl p-6 flex-grow shadow-sm md:w-2/3 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">Asignaturas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Matemáticas */}
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold">M</span>
                <span className="text-base text-gray-700">Matemáticas</span>
              </div>
              <span className="text-base font-semibold text-blue-700">550 <span className="text-gray-400 text-sm">/1000</span></span>
            </div>
            {/* Lenguaje */}
            <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-700 font-bold">L</span>
                <span className="text-base text-gray-700">Lenguaje</span>
              </div>
              <span className="text-base font-semibold text-purple-700">700 <span className="text-gray-400 text-sm">/1000</span></span>
            </div>
            {/* Ciencias */}
            <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-700 font-bold">C</span>
                <span className="text-base text-gray-700">Ciencias</span>
              </div>
              <span className="text-base font-semibold text-green-700">600 <span className="text-gray-400 text-sm">/1000</span></span>
            </div>
            {/* Historia */}
            <div className="flex items-center justify-between bg-amber-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-bold">H</span>
                <span className="text-base text-gray-700">Historia</span>
              </div>
              <span className="text-base font-semibold text-amber-700">550 <span className="text-gray-400 text-sm">/1000</span></span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg text-white font-semibold shadow-sm transition-all flex items-center gap-2">
              <span>Ver Detalle</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">Progreso</h3>
          <p className="text-gray-500 text-sm text-center">Has mejorado un 15% en tus puntajes durante los últimos 3 meses.</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">Ensayos</h3>
          <p className="text-gray-500 text-sm text-center">Has completado 48 ensayos de los 50 recomendados para este período.</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">Destaque</h3>
          <p className="text-gray-500 text-sm text-center">Tu mejor rendimiento es en Lenguaje, destacando en comprensión lectora.</p>
        </div>
      </div>
    </div>
  );
} 