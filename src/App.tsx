import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserDetail } from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cards/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
