import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth/Auth";
import "./App.css";
import { Home } from "./components/Home/Home";

function App() {
  const [user,setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"  index element={<Auth setUser={setUser} />} />
          <Route path="/home" element={<Home user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
