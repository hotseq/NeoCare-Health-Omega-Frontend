import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Columna from "../components/Columna";
import EditarTarjetaModal from "../components/EditarTarjetaModal";
import type { Card } from "../types/card";
import { getCards, updateCard } from "../api/cards";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

export default function Board() {
  const columns = ["To Do", "Doing", "Done"];

  const [cards, setCards] = useState<Card[]>([]);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     Cargar tarjetas
  ========================= */
  async function loadCards() {
    try {
      setError(null);
      const data = await getCards();
      setCards(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tarjetas. Inicia sesión o revisa la API.");
    }
  }

  // ✅ useEffect seguro con async
  useEffect(() => {
    const fetchCards = async () => {
      await loadCards();
    };
    fetchCards();
  }, []);

  /* =========================
     Guardar edición
  ========================= */
  async function handleSaveCard(data: { title: string; due_date?: string | null }) {
    if (!editingCard) return;

    await updateCard(editingCard.id, data);
    setEditingCard(null);
    loadCards(); // refresca tablero
  }

  const normalize = (s?: string) => s?.trim().toLowerCase();
  const toTitleStatus = (id: string): Card["status"] => {
    switch (id) {
      case "to do":
        return "To Do";
      case "doing":
        return "Doing";
      case "done":
        return "Done";
      default:
        return "To Do";
    }
  };

  const cardsByColumn: Record<string, Card[]> = {
    "To Do": cards.filter((c) => normalize(c.status) === "to do"),
    Doing: cards.filter((c) => normalize(c.status) === "doing"),
    Done: cards.filter((c) => normalize(c.status) === "done"),
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = String(active.id);
    const newStatus = toTitleStatus(String(over.id));

    // Optimiza el UI
    setCards((prev) =>
      prev.map((c) => (String(c.id) === cardId ? { ...c, status: newStatus } : c))
    );

    updateCard(Number(cardId), { status: newStatus }).catch((err) => {
      console.error(err);
      setError("No se pudo guardar el cambio. Recarga la página.");
      loadCards(); // rollback simple
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div>
        <div style={{ padding: 20, position: "relative" }}>
          <h1 style={{ textAlign: "center" }}>Board</h1>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          {/* BOTONES EN LA ESQUINA SUPERIOR DERECHA */}
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              display: "flex",
              gap: "10px",
            }}
          >
            <Link to="/mis-horas">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Mis Horas
              </button>
            </Link>

            <Link to="/board/nueva">
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Nueva Tarjeta
              </button>
            </Link>
          </div>
        </div>

        {editingCard && (
          <EditarTarjetaModal
            initialTitle={editingCard.title}
            initialDueDate={editingCard.due_date}
            onSave={handleSaveCard}
            onClose={() => setEditingCard(null)}
          />
        )}

        <div style={{ display: "flex", padding: 20 }}>
          {columns.map((col) => (
            <Columna
              key={col}
              columnId={col.trim().toLowerCase()}
              title={col}
              cards={cardsByColumn[col]}
              onCardClick={setEditingCard}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
