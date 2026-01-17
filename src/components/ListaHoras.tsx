import React from 'react';
import type { Worklog } from '../api/worklog';

interface ListaHorasProps {
  horas: Worklog[];
  usuarioActualId?: string;
  onEditar: (hora: Worklog) => void;
  onEliminar: (horaId: string) => void;
}

const ListaHoras: React.FC<ListaHorasProps> = ({
  horas,
  usuarioActualId,
  onEditar,
  onEliminar,
}) => {
  const formatearFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearHora = (fechaString: string) => {
    return new Date(fechaString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (horas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No hay horas registradas
      </div>
    );
  }

  const totalHoras = horas.reduce((sum, hora) => sum + hora.hours, 0);

  return (
    <div className="lista-horas">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '2px solid #007bff'
      }}>
        <h5 style={{ margin: 0 }}>📋 Registro de Horas</h5>
        <span style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px'
        }}>
          Total: {totalHoras.toFixed(2)}h
        </span>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {horas.map(hora => (
          <div
            key={hora.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#fff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    backgroundColor: '#e9ecef',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    {formatearFecha(hora.date)}
                  </span>
                  <strong style={{ color: '#007bff' }}>
                    {hora.hours}h
                  </strong>
                  {hora.userName && (
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      por {hora.userName}
                    </span>
                  )}
                </div>
                
                {hora.note && (
                  <p style={{
                    margin: '8px 0 0 0',
                    padding: '8px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    {hora.note}
                  </p>
                )}
                
                <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                  Registrado: {formatearFecha(hora.createdAt)} a las {formatearHora(hora.createdAt)}
                </div>
              </div>

              {/* Botones de acción solo para el usuario actual */}
              {usuarioActualId && hora.userId === usuarioActualId && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => onEditar(hora)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#ffc107',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEliminar(hora.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaHoras;