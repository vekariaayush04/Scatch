import { useState } from "react";
import { BrowserRouter , Route , Routes } from "react-router-dom"
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/auth" element={<Auth/>}/>
        <Route path="/user/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
