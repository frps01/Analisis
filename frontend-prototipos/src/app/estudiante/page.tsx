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
            className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-full text-black font-bold transition-all shadow-md"
          >
            Inicio
          </Link>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/perfil" 
            className="bg-gray-400 hover:bg-gray-500 px-8 py-3 rounded-full text-black font-bold transition-all shadow-md"
          >
            Perfil
          </Link>
          <Link 
            href="/estudiante" 
            className="bg-blue-400 hover:bg-blue-500 px-8 py-3 rounded-full text-white font-bold transition-all shadow-md"
          >
            Estudiante
          </Link>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row justify-between gap-10 max-w-6xl mx-auto">
        {/* Círculo de puntaje promedio */}
        <div className="flex flex-col items-center md:w-1/3">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">Puntaje Promedio</h2>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-green-300 to-green-200 blur-md transform scale-105"></div>
            <div className="relative bg-gradient-to-tr from-green-400 to-green-200 rounded-full w-[240px] h-[240px] flex items-center justify-center shadow-xl transition-all hover:scale-105 cursor-pointer">
              <span className="text-7xl font-bold text-white drop-shadow-md">850</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-center max-w-xs">Puntaje basado en tus últimos 10 ensayos realizados</p>
        </div>

        {/* Panel de asignaturas */}
        <div className="bg-white rounded-2xl p-8 flex-grow shadow-xl md:w-2/3 hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">Asignaturas</h2>
          
          <div className="grid grid-cols-[1fr,1fr] gap-y-8 mb-8">
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all">
                <span className="text-blue-700 font-bold">M</span>
              </div>
              <span className="text-lg">Matemáticas</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold bg-blue-50 py-1 px-3 rounded-full">
                <span className="text-blue-700">550</span>
                <span className="text-gray-400">/1000</span>
              </span>
            </div>
            
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-all">
                <span className="text-purple-700 font-bold">L</span>
              </div>
              <span className="text-lg">Lenguaje</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold bg-purple-50 py-1 px-3 rounded-full">
                <span className="text-purple-700">700</span>
                <span className="text-gray-400">/1000</span>
              </span>
            </div>
            
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:bg-green-200 transition-all">
                <span className="text-green-700 font-bold">C</span>
              </div>
              <span className="text-lg">Ciencias</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold bg-green-50 py-1 px-3 rounded-full">
                <span className="text-green-700">600</span>
                <span className="text-gray-400">/1000</span>
              </span>
            </div>
            
            <div className="flex items-center group">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-all">
                <span className="text-amber-700 font-bold">H</span>
              </div>
              <span className="text-lg">Historia</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold bg-amber-50 py-1 px-3 rounded-full">
                <span className="text-amber-700">550</span>
                <span className="text-gray-400">/1000</span>
              </span>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <button className="bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-full text-white font-bold shadow-lg transition-all hover:scale-105 flex items-center space-x-2">
              <span>Ver Detalle</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Estadísticas adicionales */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Progreso</h3>
          </div>
          <p className="text-gray-600">Has mejorado un 15% en tus puntajes durante los últimos 3 meses.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Ensayos</h3>
          </div>
          <p className="text-gray-600">Has completado 48 ensayos de los 50 recomendados para este período.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Destaque</h3>
          </div>
          <p className="text-gray-600">Tu mejor rendimiento es en Lenguaje, destacando en comprensión lectora.</p>
        </div>
      </div>
    </div>
  );
} 