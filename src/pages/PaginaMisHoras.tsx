import React, { useState, useEffect } from "react";
import type { Worklog } from "../api/worklog";
import { getMyHours } from "../api/worklog";

export const PaginaMisHoras: React.FC = () => {
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // Función para obtener mis horas
  // =========================
  const fetchMyHours = async (start?: string, end?: string) => {
    setCargando(true);
    setError(null);
    try {
      const data = await getMyHours(start, end);
      setWorklogs(data);
    } catch (err) {
      console.error(err);
      setError("Error obteniendo tus horas");
    } finally {
      setCargando(false);
    }
  };

  // =========================
  // Llamada inicial solo al montar
  // =========================
  useEffect(() => {
    fetchMyHours(); // ⚡ Se llama dentro de efecto, no directamente setState async
  }, []);

  return (
    <div className="pagina-container">
      <div className="header">
        <h2>Mis Horas</h2>
      </div>

      <div className="filtros">
        <h3>Filtrar por fecha</h3>
        <div className="inputs">
          <div className="input-container">
            <label htmlFor="startDate">Desde:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              placeholder="Fecha inicio"
            />
          </div>
          <div className="input-container">
            <label htmlFor="endDate">Hasta:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              placeholder="Fecha fin"
            />
          </div>
          <button
            onClick={() => fetchMyHours(startDate || undefined, endDate || undefined)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              alignSelf: "center"
            }}
          >
            Filtrar
          </button>
        </div>
      </div>

      {cargando ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : worklogs.length === 0 ? (
        <p>No hay registros de horas en este rango.</p>
      ) : (
        <div className="detalle">
          {worklogs.map(w => (
            <div key={w.id} className="hora">
              <div className="hora-info">{w.date} - {w.hours}h</div>
              <div className="hora-note">{w.note || "Sin nota"}</div>
              <div className="hora-time">Tarjeta: {w.cardTitle || "N/A"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
