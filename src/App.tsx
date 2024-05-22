import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="history" element={<History/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}