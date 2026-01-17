import { useNavigate } from "react-router-dom";
import NuevaTarjeta, {
  type NuevaTarjetaData,
} from "../components/NuevaTarjeta";
import { createCard } from "../api/cards";

export default function NuevaTarjetaPage() {
  const navigate = useNavigate();

  const handleCreateCard = async (
    cardData: NuevaTarjetaData
  ): Promise<void> => {
    try {
      await createCard(cardData);
      navigate("/board"); // volver al tablero
    } catch (error) {
      console.error(error);
      alert("Error al crear la tarjeta");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nueva tarjeta</h1>
      <NuevaTarjeta onSubmit={handleCreateCard} />
    </div>
  );
}
