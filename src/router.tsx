// src/router.tsx
import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import NuevaTarjetaPage from "./pages/NuevaTarjetaPage";
import RequireAuth from "./components/RequireAuth";
import { PaginaMisHoras } from "./pages/PaginaMisHoras"; // 🔹 asegúrate de que es export const

// Loader para proteger rutas
const requireAuthLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>NeoCare Health</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/board",
    loader: requireAuthLoader,
    element: (
      <RequireAuth>
        <Board />
      </RequireAuth>
    ),
  },
  {
    path: "/board/nueva",
    loader: requireAuthLoader,
    element: (
      <RequireAuth>
        <NuevaTarjetaPage />
      </RequireAuth>
    ),
  },
  {
    path: "/mis-horas",
    loader: requireAuthLoader,
    element: (
      <RequireAuth>
        <PaginaMisHoras />
      </RequireAuth>
    ),
  },
]);
