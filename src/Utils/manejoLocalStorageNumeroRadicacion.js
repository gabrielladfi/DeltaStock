// utils para manejar el número de radicación en el local storage
const LOCAL_STORAGE_KEY = 'numeroRadicacionLocalStorage';
const LOCAL_STORAGE_KEY_DATE = 'fechaStorage';
const SESION_STORAGE_KEY_USER = 'userData';
const SESSION_STORAGE_KEY_OTHER_ACT = 'otherActLocalStorage';

// Guardar el número de radicación
export const setNumeroRadicacion = (numero) => {
  if (numero) {
    localStorage.setItem(LOCAL_STORAGE_KEY, numero);
  }
};

// Obtener el número de radicación
export const getNumeroRadicacion = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || null;
};

// Eliminar el número de radicación (opcional)
export const removeNumeroRadicacion = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};


// Guardar la fecha de radicacion 
export const setFechaRadicacion = (fecha) => {
  if (fecha) {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATE, fecha);
  }
};

// Eliminar el número de radicación (opcional)
export const removeFechaRadicacion = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_DATE);
};

// Obtener LA FECHA DE RADICACION
export const getFechaRadicacion = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY_DATE) || null;
};


// Guardar el objeto del usuario
export const getDataUser = () => {
  try {
      const storedData = localStorage.getItem(SESION_STORAGE_KEY_USER);

      if (!storedData) return null; // 🚨 Si no hay datos, retorna null.

      const parsedData = JSON.parse(storedData);

      // ✅ Maneja una posible expiración (opcional)
      if (parsedData.expiresAt && new Date().getTime() > parsedData.expiresAt) {
          console.warn('⚠️ Sesión expirada.');
          localStorage.removeItem(SESION_STORAGE_KEY_USER);
          return null;
      }

      return parsedData; // ✅ Devuelve el objeto del usuario.
  } catch (error) {
      console.error('❌ Error al obtener el usuario del localStorage:', error);
      return null; // En caso de error, retorna null para prevenir fallos.
  }
};

export const removeDataUser = () => {
  try {
      sessionStorage.removeItem(SESION_STORAGE_KEY_USER);
      console.log('✅ Sesión cerrada correctamente.');
  } catch (error) {
      console.error('❌ Error al eliminar el usuario del sessionStorage:', error);
  }
};

// Guardar el objeto del otro acto
export const setOtherAct = (otherAct) => {
  sessionStorage.setItem(SESSION_STORAGE_KEY_OTHER_ACT, JSON.stringify(otherAct));
};

// Obtener el objeto del otro acto
export const getOtherAct = () => {
  const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY_OTHER_ACT);
  return storedData ? JSON.parse(storedData) : null;
};

// Eliminar el objeto del otro acto
export const removeOtherAct = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY_OTHER_ACT);
};
