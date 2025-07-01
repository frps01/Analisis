'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState<'estudiante' | 'docente'>('estudiante');
  
  // Datos del usuario (en un caso real vendrían de una API)
  const [userData, setUserData] = useState({
    nombre: 'María González',
    email: 'maria.gonzalez@email.com',
    telefono: '+56 9 1234 5678',
    institucion: 'Colegio San Agustín',
    curso: '4° Medio A',
    especialidad: 'Matemática',
    fechaRegistro: '15 de Marzo, 2024',
    ultimoAcceso: 'Hoy, 14:30',
    avatar: '/api/placeholder/150/150'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí se guardarían los cambios en la API
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí se restaurarían los datos originales
  };

  // Estadísticas específicas según el rol
  const studentStats = [
    { label: 'Ensayos Completados', value: '24', icon: '📝', color: 'bg-blue-500' },
    { label: 'Puntaje Promedio', value: '750', icon: '📊', color: 'bg-green-500' },
    { label: 'Mejor Asignatura', value: 'Matemática', icon: '🏆', color: 'bg-yellow-500' },
    { label: 'Días Activo', value: '45', icon: '📅', color: 'bg-purple-500' }
  ];

  const teacherStats = [
    { label: 'Preguntas Creadas', value: '156', icon: '❓', color: 'bg-blue-500' },
    { label: 'Ensayos Generados', value: '12', icon: '📋', color: 'bg-green-500' },
    { label: 'Estudiantes', value: '89', icon: '👥', color: 'bg-yellow-500' },
    { label: 'Días Activo', value: '67', icon: '📅', color: 'bg-purple-500' }
  ];

  const stats = userRole === 'estudiante' ? studentStats : teacherStats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <Link href="/" className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-full text-gray-700 font-medium transition-colors">
                ← Volver al Inicio
              </Link>
            </div>
            <div className="flex gap-3">
              <Link href="/estudiante" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors">
                Estudiante
              </Link>
              <Link href="/docente" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors">
                Docente
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del perfil */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Avatar */}
              <div className="relative -mt-16">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white">
                  {userData.nombre.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              {/* Información principal */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userData.nombre}</h1>
                    <p className="text-gray-600">{userData.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        userRole === 'estudiante' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {userRole === 'estudiante' ? '👨‍🎓 Estudiante' : '👨‍🏫 Docente'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Último acceso: {userData.ultimoAcceso}
                      </span>
                    </div>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Editar Perfil
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información personal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detalles del perfil */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.nombre}
                      onChange={(e) => setUserData({...userData, nombre: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.nombre}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.email}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.telefono}
                      onChange={(e) => setUserData({...userData, telefono: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.telefono}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institución</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.institucion}
                      onChange={(e) => setUserData({...userData, institucion: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.institucion}</div>
                  )}
                </div>
                
                {userRole === 'estudiante' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
                    {isEditing ? (
                      <select
                        value={userData.curso}
                        onChange={(e) => setUserData({...userData, curso: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="3° Medio A">3° Medio A</option>
                        <option value="3° Medio B">3° Medio B</option>
                        <option value="4° Medio A">4° Medio A</option>
                        <option value="4° Medio B">4° Medio B</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.curso}</div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                    {isEditing ? (
                      <select
                        value={userData.especialidad}
                        onChange={(e) => setUserData({...userData, especialidad: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Matemática">Matemática</option>
                        <option value="Lenguaje">Lenguaje</option>
                        <option value="Ciencias">Ciencias</option>
                        <option value="Historia">Historia</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.especialidad}</div>
                    )}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Registro</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.fechaRegistro}</div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cambiar rol */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Rol</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setUserRole('estudiante')}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    userRole === 'estudiante'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👨‍🎓</span>
                    <div className="text-left">
                      <div className="font-medium">Estudiante</div>
                      <div className="text-sm opacity-75">Ver perfil de estudiante</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setUserRole('docente')}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    userRole === 'docente'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👨‍🏫</span>
                    <div className="text-left">
                      <div className="font-medium">Docente</div>
                      <div className="text-sm opacity-75">Ver perfil de docente</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link href="/estudiante" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">📚</span>
                    <span className="font-medium text-blue-700">Ir a Estudiantes</span>
                  </div>
                </Link>
                <Link href="/docente" className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600">📋</span>
                    <span className="font-medium text-green-700">Ir a Docentes</span>
                  </div>
                </Link>
                <Link href="/docente/questions" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600">❓</span>
                    <span className="font-medium text-purple-700">Gestionar Preguntas</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Configuración de cuenta */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🔒</span>
                    <span className="font-medium text-gray-700">Cambiar Contraseña</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🔔</span>
                    <span className="font-medium text-gray-700">Notificaciones</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">🌙</span>
                    <span className="font-medium text-gray-700">Modo Oscuro</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 