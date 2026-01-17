import { useDraggable } from "@dnd-kit/core";
import { formatDate } from "../utils/date";
import SeccionHoras from "./SeccionHoras"; 

interface TarjetaProps {
  id: string; 
  title: string;
  due_date?: string | null;
  onClick: () => void;
}

export default function Tarjeta({ id, title, due_date, onClick }: TarjetaProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({id});
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
        opacity: isDragging ? 0.6 : 1,
        boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.15)" : undefined,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? 1.03 : 1})`
          : undefined,
      }}
    >
      <h3>{title}</h3>
      {due_date && <p>{formatDate(due_date)}</p>}
      
      
      <SeccionHoras tarjetaId={String(id)} />
    </div>
  );
}