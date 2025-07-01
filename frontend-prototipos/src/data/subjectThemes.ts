export interface Theme {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface SubjectThemes {
  [subject: string]: Theme[];
}

export const subjectThemes: SubjectThemes = {
  'Matemática': [
    {
      id: 'algebra',
      name: 'Álgebra',
      description: 'Ecuaciones, polinomios, funciones algebraicas',
      color: 'bg-blue-500'
    },
    {
      id: 'geometria',
      name: 'Geometría',
      description: 'Figuras geométricas, áreas, volúmenes',
      color: 'bg-green-500'
    },
    {
      id: 'calculo',
      name: 'Cálculo',
      description: 'Derivadas, integrales, límites',
      color: 'bg-purple-500'
    },
    {
      id: 'trigonometria',
      name: 'Trigonometría',
      description: 'Funciones trigonométricas, identidades',
      color: 'bg-orange-500'
    },
    {
      id: 'estadistica',
      name: 'Estadística',
      description: 'Probabilidad, distribuciones, análisis de datos',
      color: 'bg-red-500'
    },
    {
      id: 'numeros',
      name: 'Números',
      description: 'Conjuntos numéricos, propiedades',
      color: 'bg-indigo-500'
    }
  ],
  'Lenguaje': [
    {
      id: 'comprension-lectora',
      name: 'Comprensión Lectora',
      description: 'Análisis e interpretación de textos',
      color: 'bg-blue-500'
    },
    {
      id: 'gramatica',
      name: 'Gramática',
      description: 'Morfología, sintaxis, ortografía',
      color: 'bg-green-500'
    },
    {
      id: 'literatura',
      name: 'Literatura',
      description: 'Géneros literarios, figuras literarias',
      color: 'bg-purple-500'
    },
    {
      id: 'comunicacion',
      name: 'Comunicación',
      description: 'Tipos de textos, funciones del lenguaje',
      color: 'bg-orange-500'
    },
    {
      id: 'vocabulario',
      name: 'Vocabulario',
      description: 'Sinónimos, antónimos, campos semánticos',
      color: 'bg-red-500'
    },
    {
      id: 'produccion-textual',
      name: 'Producción Textual',
      description: 'Escritura, coherencia, cohesión',
      color: 'bg-indigo-500'
    }
  ],
  'Ciencias': [
    {
      id: 'biologia',
      name: 'Biología',
      description: 'Sistemas biológicos, evolución, ecología',
      color: 'bg-green-500'
    },
    {
      id: 'fisica',
      name: 'Física',
      description: 'Mecánica, termodinámica, electromagnetismo',
      color: 'bg-blue-500'
    },
    {
      id: 'quimica',
      name: 'Química',
      description: 'Reacciones químicas, estructura atómica',
      color: 'bg-purple-500'
    },
    {
      id: 'geologia',
      name: 'Geología',
      description: 'Estructura terrestre, procesos geológicos',
      color: 'bg-orange-500'
    },
    {
      id: 'astronomia',
      name: 'Astronomía',
      description: 'Sistema solar, universo, exploración espacial',
      color: 'bg-indigo-500'
    },
    {
      id: 'metodologia-cientifica',
      name: 'Metodología Científica',
      description: 'Método científico, experimentación',
      color: 'bg-red-500'
    }
  ],
  'Historia': [
    {
      id: 'historia-chilena',
      name: 'Historia de Chile',
      description: 'Proceso de independencia, república',
      color: 'bg-red-500'
    },
    {
      id: 'historia-universal',
      name: 'Historia Universal',
      description: 'Civilizaciones antiguas, edad media, moderna',
      color: 'bg-blue-500'
    },
    {
      id: 'geografia',
      name: 'Geografía',
      description: 'Relieve, clima, recursos naturales',
      color: 'bg-green-500'
    },
    {
      id: 'formacion-ciudadana',
      name: 'Formación Ciudadana',
      description: 'Derechos, deberes, participación ciudadana',
      color: 'bg-purple-500'
    },
    {
      id: 'economia',
      name: 'Economía',
      description: 'Sistemas económicos, comercio, desarrollo',
      color: 'bg-orange-500'
    },
    {
      id: 'cultura',
      name: 'Cultura',
      description: 'Arte, música, tradiciones culturales',
      color: 'bg-indigo-500'
    }
  ]
};

export const getThemesForSubject = (subject: string): Theme[] => {
  return subjectThemes[subject] || [];
}; 