import React, { useState, useEffect } from 'react';
import type { Worklog } from '../api/worklog';
import { getWorklogsByCard, createWorklog, updateWorklog, deleteWorklog } from '../api/worklog';
import ListaHoras from './ListaHoras';
import FormularioHora from './FormularioHora';

interface SeccionHorasProps { tarjetaId: string }

const SeccionHoras: React.FC<SeccionHorasProps> = ({ tarjetaId }) => {
  const [horas, setHoras] = useState<Worklog[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [horaEditando, setHoraEditando] = useState<Worklog | null>(null);

  const usuarioActualId = localStorage.getItem("userId") || "";

  const obtenerHoras = async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await getWorklogsByCard(tarjetaId);
      setHoras(datos);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las horas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { obtenerHoras(); }, [tarjetaId]);

  const manejarCrear = async (datos: { date: string; hours: number; note: string }) => {
    await createWorklog(tarjetaId, datos);
    setMostrarFormulario(false);
    obtenerHoras();
  };

  const manejarEditar = async (datos: { date: string; hours: number; note: string }) => {
    if (!horaEditando) return;
    await updateWorklog(horaEditando.id, { hours: datos.hours, note: datos.note });
    setHoraEditando(null);
    obtenerHoras();
  };

  const manejarEliminar = async (horaId: string) => {
    if (!confirm("¿Eliminar esta hora?")) return;
    await deleteWorklog(horaId);
    obtenerHoras();
  };

  return (
    <div>
      {error && <div style={{color:'red'}}>{error}</div>}
      {mostrarFormulario && <FormularioHora onSubmit={manejarCrear} onCancelar={()=>setMostrarFormulario(false)}/>}
      {horaEditando && <FormularioHora onSubmit={manejarEditar} datosIniciales={horaEditando} onCancelar={()=>setHoraEditando(null)}/>}
      {cargando ? <p>Cargando...</p> : <ListaHoras horas={horas} usuarioActualId={usuarioActualId} onEditar={setHoraEditando} onEliminar={manejarEliminar}/>}
      {!mostrarFormulario && !horaEditando && <button onClick={()=>setMostrarFormulario(true)}>Registrar hora</button>}
    </div>
  );
};

export default SeccionHoras;
