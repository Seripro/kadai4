import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserDetail } from "./pages/UserDetail";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cards/:id" element={<UserDetail />} />
        <Route path="/cards/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
