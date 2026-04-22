import "./App.css";
import { Routes, Route } from "react-router";
import { CustomerDashboard } from "./customer/dashboard";
function App() {
   return (
      <div>
         <Routes>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
         </Routes>
      </div>
   );
}

export default App;
