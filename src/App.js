
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users.js";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path= "/" index element={<Home />} />
          <Route path="users" element={<Users />} />
          
        
      </Routes>
    </BrowserRouter>
  );
}


