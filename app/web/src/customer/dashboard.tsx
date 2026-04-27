import { DashboardHeader } from "../../components/customer-dashboard/header";
import BalanceCard from "../../components/customer-dashboard/balanceCard";
import RecentTransactions from "../../components/customer-dashboard/recent-transaction";
import QRScanner from "../../components/customer-dashboard/qr-scanner";

export default function CustomerDashboard() {
   return (
      <div className="min-h-screen bg-[#E9E1D5] pb-8 md:pb-8">
         <div className="mx-auto max-w-7xl ">
            <DashboardHeader />

            <div className="px-4 md:px-8">
               <div className="grid md:grid-cols-12 gap-5">
                  <div className="space-y-5 md:col-span-8">
                     <BalanceCard />
                     <RecentTransactions />
                  </div>

                  <div className="space-y-5 md:col-span-4">
                    <QRScanner/>  
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
