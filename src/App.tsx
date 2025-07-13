import { Routes, Route } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
