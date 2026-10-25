import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import CreateUser from "./pages/CreateUser";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;