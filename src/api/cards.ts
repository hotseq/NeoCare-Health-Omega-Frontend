import type { Card } from "../types/card";
import type { NuevaTarjetaData } from "../components/NuevaTarjeta";

const API_URL = "http://localhost:8000";

/* ⚠️ SIEMPRE función, nunca objeto fijo */
function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}


/* =========================
   Obtener tarjetas
========================= */
export async function getCards(): Promise<Card[]> {
  const response = await fetch(`${API_URL}/cards/`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error obteniendo tarjetas");
  }

  return response.json();
}

/* =========================
   Crear tarjeta
========================= */
export async function createCard(
  data: NuevaTarjetaData
): Promise<Card> {
  const response = await fetch(`${API_URL}/cards/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creando tarjeta");
  }

  return response.json();
}

/* =========================
   Actualizar tarjeta
========================= */
export async function updateCard(
  cardId: number,
  data: Partial<Card>
): Promise<Card> {
  const response = await fetch(`${API_URL}/cards/${cardId}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error actualizando tarjeta");
  }

  return response.json();
}
