import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react";

export default function BalanceCard() {
   const [showBalance, setShowBalance] = useState(true);

   return (
      <div className="relative bg-[#2C1810] p-6 md:p-8 rounded-2xl overflow-hidden">
         <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#3C2719]" />
         <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[#341F14]" />

         <div className="relative">
            <div className="flex items-center justify-between">
               <p className="text-[#BCB7B2] text-sm font-medium">Total Balance</p>

               <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="rounded-full p-1 transition-colors hover:bg-[#4F3C2F]"
                  aria-label={showBalance ? "Hide balance" : "Show balance"}
               >
                  {showBalance ? (
                     <Eye className="h-4 w-4 text-[#C7C1BC]" />
                  ) : (
                     <EyeOff className="h-4 w-4 text-[#C7C1BC]" />
                  )}
               </button>
            </div>

            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-[#FAFAF8]">
               {showBalance ? "₹4,43,459.43" : "*******"}
            </h2>

            <div className="mt-6 flex items-center gap-3">
               <button className="rounded-xl gap-2 flex-1 bg-[#C9A96E] font-medium flex items-center justify-center hover:bg-[#BA9B65] min-h-10">
                  <ArrowUpRight className="h-4 w-4" />
                  Send
               </button>

               <button className="rounded-xl gap-2 flex-1 bg-[#2C1810] font-medium border-[#655751] border text-[#FAFAF8] flex items-center justify-center hover:bg-[#412E27] min-h-10">
                  <ArrowDownLeft className="h-4 w-4" />
                  Request
               </button>
            </div>
         </div>
      </div>
   );
}
