import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./router";


/* definicion del componente APP */
function App() {

  /*indicamos que conecte con el router*/ 
  return  (<RouterProvider router={router} />)
  
}

/*para que el componente App sea exportable*/
export default App
