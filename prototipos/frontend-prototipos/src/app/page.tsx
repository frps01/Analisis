'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="w-full flex justify-between">
        <Link href="/" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
          Inicio
        </Link>
        <div className="flex gap-4">
          <Link href="/perfil" className="bg-gray-400 px-8 py-3 rounded-full text-black font-bold">
            Perfil
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col gap-[32px] items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Plataforma de Ensayos</h1>
        
        <div className="flex gap-8 flex-wrap justify-center">
          <Link 
            href="/estudiante" 
            className="bg-blue-200 hover:bg-blue-300 transition-colors p-8 rounded-lg shadow-md flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 bg-blue-300 flex items-center justify-center rounded-full">
              <span className="text-3xl font-bold">E</span>
            </div>
            <span className="text-xl font-semibold">Acceso Estudiante</span>
            <p className="text-center max-w-xs">Revisa tus puntajes y resultados de ensayos</p>
          </Link>
          
          <Link 
            href="/docente" 
            className="bg-green-200 hover:bg-green-300 transition-colors p-8 rounded-lg shadow-md flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 bg-green-300 flex items-center justify-center rounded-full">
              <span className="text-3xl font-bold">D</span>
            </div>
            <span className="text-xl font-semibold">Acceso Docente</span>
            <p className="text-center max-w-xs">Configura y genera ensayos para tus estudiantes</p>
          </Link>
        </div>
      </main>
      
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-gray-500">© 2025 - GRUPO10-2025-PROYINF</span>
      </footer>
    </div>
  );
}
