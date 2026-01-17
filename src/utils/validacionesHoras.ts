export const validarHora = (data: { hours: number; note: string; date: string }) => {
  const errores: Record<string, string> = {};

  // Validar horas
  if (data.hours <= 0) {
    errores.hours = 'Las horas deben ser mayores a 0';
  } else if (data.hours < 0.25) {
    errores.hours = 'El mínimo es 0.25 horas (15 minutos)';
  }

  // Validar nota
  if (data.note.length > 200) {
    errores.note = 'La nota no puede exceder 200 caracteres';
  }

  // Validar fecha
  const today = new Date();
  const selectedDate = new Date(data.date);
  if (selectedDate > today) {
    errores.date = 'No puedes registrar horas para fechas futuras';
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores, // 👈 ahora coincide con FormularioHora.tsx
  };
};
