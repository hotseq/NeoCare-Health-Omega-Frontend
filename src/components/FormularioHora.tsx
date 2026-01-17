import React, { useState } from 'react';
import { validarHora } from '../utils/validacionesHoras';
import './FormularioHoras.css';

interface FormularioHoraProps {
  onSubmit: (datos: { date: string; hours: number; note: string }) => Promise<void>;
  onCancelar: () => void;
  datosIniciales?: { date: string; hours: number; note: string };
  editando?: boolean;
}

const FormularioHora: React.FC<FormularioHoraProps> = ({
  onSubmit,
  onCancelar,
  datosIniciales,
  editando = false,
}) => {
  const [datos, setDatos] = useState({
    date: datosIniciales?.date || new Date().toISOString().split('T')[0],
    hours: datosIniciales?.hours || 1,
    note: datosIniciales?.note || '',
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacion = validarHora(datos);
    if (!validacion.valido) {
      setErrores(validacion.errores ?? {}); // 👈 asegura que nunca sea undefined
      return;
    }

    setErrores({});
    setEnviando(true);

    try {
      await onSubmit(datos);
    } catch (err) {
      console.error(err); // 👈 opcional, puedes borrarlo si no quieres logs
      setErrores({ submit: 'Error al guardar. Intenta nuevamente.' });
    } finally {
      setEnviando(false);
    }
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: name === 'hours' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="formulario-hora">
      <h4>{editando ? '✏️ Editar Hora' : '➕ Registrar Hora'}</h4>

      <form onSubmit={manejarSubmit}>
        <div>
          <label htmlFor="date">Fecha *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={datos.date}
            onChange={manejarCambio}
            max={new Date().toISOString().split('T')[0]}
            required
          />
          {errores.date && <div className="error">{errores.date}</div>}
        </div>

        <div>
          <label htmlFor="hours">Horas * (mínimo 0.25)</label>
          <input
            id="hours"
            type="number"
            name="hours"
            min={0.25}
            step={0.25}
            value={datos.hours}
            onChange={manejarCambio}
            required
          />
          {errores.hours && <div className="error">{errores.hours}</div>}
        </div>

        <div>
          <label htmlFor="note">Nota (máx. 200 caracteres)</label>
          <textarea
            id="note"
            name="note"
            value={datos.note}
            onChange={manejarCambio}
            maxLength={200}
            rows={3}
            aria-label="Nota sobre la hora registrada"
          />
          <div className="contador">{datos.note.length}/200 caracteres</div>
          {errores.note && <div className="error">{errores.note}</div>}
        </div>

        {errores.submit && <div className="error-submit">{errores.submit}</div>}

        <div className="botones">
          <button type="button" onClick={onCancelar} disabled={enviando} className="cancelar">
            Cancelar
          </button>
          <button type="submit" disabled={enviando} className="guardar">
            {enviando ? 'Guardando...' : editando ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioHora;
