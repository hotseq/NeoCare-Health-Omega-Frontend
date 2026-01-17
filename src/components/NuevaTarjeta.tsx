import { useState, type FormEvent } from "react";
import "../styles/nuevaTarjeta.css";

export interface NuevaTarjetaData {
  title: string;
  description?: string;
  due_date?: string | null;
}

interface NuevaTarjetaProps {
  onSubmit: (data: NuevaTarjetaData) => void;
}

export default function NuevaTarjeta({ onSubmit }: NuevaTarjetaProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    setError("");

    onSubmit({
      title,
      description: description || undefined,
      due_date: dueDate || null,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form className="nueva-tarjeta-form" onSubmit={handleSubmit}>

      <label>
        <span>Título *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Descripción</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        <span>Fecha límite</span>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}
      <br></br>
      <button type="submit">Crear tarjeta</button>
    </form>
  );
}
