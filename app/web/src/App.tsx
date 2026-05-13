import "./App.css";
import { Routes, Route } from "react-router";
import CustomerDashboard from "./customer/dashboard";
import Auth from "./auth/auth";

function App() {
   return (
      <div>
         <Routes>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/auth" element={<Auth />} />
         </Routes>
      </div>
   );
}

export default App;
