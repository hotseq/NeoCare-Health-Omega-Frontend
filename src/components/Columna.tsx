import type { Card } from "../types/card";
import Tarjeta from "./Tarjeta";
import { formatDate } from "../utils/date";
import { useDroppable } from "@dnd-kit/core";


type ColumnProps = {
  title: string;
  cards: Card[];
  onCardClick: (card: Card) => void;
  columnId: string;
};

export default function Columna({ title, cards, onCardClick, columnId }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable ({
    id: columnId,
  })
  return (
    <div
      ref={setNodeRef}
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "10px",
        width: "250px",
        minHeight: "300px",
        marginRight: "10px",
        backgroundColor: isOver ? "#ffffffff" : "#f5f5f5", /* Cambia de color si de arrastra*/
      }}
      
    >

      <h2>{title}</h2>

      {cards.length === 0 && <p>No hay tarjetas</p>}

      {cards.map((card) => (
        <Tarjeta
          key={card.id}
          id={card.id}
          title={card.title}
          due_date={card.due_date}
          onClick={() => onCardClick(card)}
          
        />
      ))}
    </div>
  );
}
