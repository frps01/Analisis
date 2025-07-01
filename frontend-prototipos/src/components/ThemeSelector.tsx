'use client';

import { getThemesForSubject } from '../data/subjectThemes';

interface ThemeSelectorProps {
  selectedSubject: string;
  selectedThemes: string[];
  onThemesChange: (themes: string[]) => void;
}

export default function ThemeSelector({ selectedSubject, selectedThemes, onThemesChange }: ThemeSelectorProps) {
  const themes = getThemesForSubject(selectedSubject);

  const toggleTheme = (themeId: string) => {
    if (selectedThemes.includes(themeId)) {
      onThemesChange(selectedThemes.filter(id => id !== themeId));
    } else {
      onThemesChange([...selectedThemes, themeId]);
    }
  };

  const selectAllThemes = () => {
    if (selectedThemes.length === themes.length) {
      onThemesChange([]);
    } else {
      onThemesChange(themes.map(theme => theme.id));
    }
  };

  const clearThemes = () => {
    onThemesChange([]);
  };

  if (!selectedSubject) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <h3 className="text-base font-medium mb-4 text-center text-gray-700">Ejes Temáticos</h3>
        <div className="text-center text-gray-500 text-sm">
          Selecciona una asignatura para ver los ejes temáticos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-gray-700">Ejes Temáticos - {selectedSubject}</h3>
        {selectedThemes.length > 0 && (
          <button
            onClick={clearThemes}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Limpiar
          </button>
        )}
      </div>

      {themes.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          No hay ejes temáticos definidos para esta asignatura
        </div>
      ) : (
        <>
          {/* Botón seleccionar todos */}
          <div className="mb-3 pb-3 border-b border-gray-200">
            <button
              onClick={selectAllThemes}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between text-sm"
            >
              <span>Seleccionar todos los ejes</span>
              <span className={`w-5 h-5 border rounded ${
                selectedThemes.length === themes.length ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
              }`}>
                {selectedThemes.length === themes.length && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Lista de ejes temáticos */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {themes.map((theme) => (
              <div key={theme.id} className="flex items-start">
                <button
                  onClick={() => toggleTheme(theme.id)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-start justify-between transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-4 h-4 rounded-full mt-0.5 ${theme.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{theme.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{theme.description}</div>
                    </div>
                  </div>
                  <span className={`w-5 h-5 border rounded mt-0.5 ${
                    selectedThemes.includes(theme.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedThemes.includes(theme.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Contador de seleccionados */}
          {selectedThemes.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                {selectedThemes.length} de {themes.length} ejes seleccionados
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 