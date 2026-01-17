import { useState } from "react";
import "../styles/modal.css";

export interface EditarTarjetaData {
  title: string;
  due_date?: string | null;
}

interface EditarTarjetaModalProps {
  initialTitle: string;
  initialDueDate?: string | null;
  onSave: (data: EditarTarjetaData) => void;
  onClose: () => void;
}

export default function EditarTarjetaModal({
  initialTitle,
  initialDueDate,
  onSave,
  onClose,
}: EditarTarjetaModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [dueDate, setDueDate] = useState(initialDueDate ?? "");
  const [error, setError] = useState("");
  const formatForInput = (date?: string | null) => {
    if (!date) return "";
    return date.split("T")[0]; // YYYY-MM-DD
  };

  const handleSave = () => {
    if (title.trim().length < 1 || title.trim().length > 80) {
      setError("El título debe tener entre 1 y 80 caracteres");
      return;
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
      setError("Fecha límite no válida");
      return;
    }

    onSave({
      title: title.trim(),
      due_date: dueDate || null,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar tarjeta</h2>

        <label>
          <span>Título *</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>Fecha límite</span>
          <input
            type="date"
            value={formatForInput(dueDate)}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="modal-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
