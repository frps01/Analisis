'use client';
import Link from 'next/link';
import React from 'react';

export default function PerfilPage() {
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
          <Link href="/perfil" className="bg-blue-300 px-8 py-3 rounded-full text-black font-bold">
            Perfil
          </Link>
          <Link href="/estudiante" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Estudiante
          </Link>
          <Link href="/docente" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Docente
          </Link>
        </div>
      </nav>

      {/* Contenido del perfil */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value="Usuario de Prueba"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value="usuario@ejemplo.com"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value="Estudiante / Docente"
                readOnly
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value="Universidad/Colegio"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Registro</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value="01/01/2025"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Último Acceso</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value="Hoy, 12:30"
                readOnly
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
} 