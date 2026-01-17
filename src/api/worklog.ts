const API_URL = "http://localhost:8000";

/* =========================
   Headers de autenticación
========================= */
export function authHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token. Usuario no autenticado");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* =========================
   Tipos
========================= */
export interface Worklog {
  id: string;
  cardId: string;
  userId: string;
  date: string;
  hours: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  cardTitle?: string;
}

/* =========================
   Funciones
========================= */
export async function getWorklogsByCard(cardId: string): Promise<Worklog[]> {
  const res = await fetch(`${API_URL}/cards/${cardId}/worklogs`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error obteniendo worklogs");
  return res.json();
}

export async function createWorklog(
  cardId: string,
  data: { date: string; hours: number; note: string }
): Promise<Worklog> {
  const res = await fetch(`${API_URL}/cards/${cardId}/worklogs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando worklog");
  return res.json();
}

export async function updateWorklog(
  worklogId: string,
  data: { hours?: number; note?: string }
): Promise<Worklog> {
  const res = await fetch(`${API_URL}/worklogs/${worklogId}`, {
    method: "PATCH", // ⚡ PATCH en vez de PUT
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando worklog");
  return res.json();
}

export async function deleteWorklog(worklogId: string): Promise<void> {
  const res = await fetch(`${API_URL}/worklogs/${worklogId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error eliminando worklog");
}

/* =========================
   Obtener mis horas
========================= */
export async function getMyHours(
  startDate?: string,
  endDate?: string
): Promise<Worklog[]> {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const res = await fetch(`${API_URL}/worklogs/me?${params.toString()}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error obteniendo tus horas");
  return res.json();
}
