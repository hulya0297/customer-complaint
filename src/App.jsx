
import { Routes, Route } from "react-router-dom";
import "./App.css";

import CustomerView from "./pages/CustomerView";
import AdminView from "./pages/AdminView";
function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<CustomerView />} />
          <Route path="/adminview" element={<AdminView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
