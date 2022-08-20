import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products.js";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path= "/" index element={<Home />} />
          <Route path="products" element={<Products />} />
          
        
      </Routes>
    </BrowserRouter>
  );
}


