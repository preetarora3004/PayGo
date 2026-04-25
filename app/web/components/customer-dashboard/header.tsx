import { BellIcon, CreditCard, Mail } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Settings } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {

   const [showDropdown, setShowDropdown] = useState(false);

   return (
      <header className="flex items-center justify-between py-4 md:px-8">
         <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-[#2C1810] flex items-center justify-center">
               <span className="text-white text-lg">P</span>
            </div>

            <span className="text-[#2C1810] font-semibold text-xl">PayGo</span>
         </div>

         <div className="flex items-center gap-4">
            <button className="rounded-full p-2 group hover:bg-[#F5F0EB]">
               <BellIcon className="h-5 w-5 relative group-hover:animate-[bell_0.4s_ease-in-out]" />
               <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>

            <button className="rounded-full p-2 relative hover:bg-[#F5F0EB]">
               <Settings className="w-5 h-5" />
            </button>

            <div className="relative">
               <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center pr-2 pl-2 cursor-pointer rounded-3xl p-1 gap-2 bg-[#FBF9F7]"
               >
                  <div className="rounded-full h-8 w-8 bg-[#C9A96E] text-xs font-bold text-center p-2">
                     PA
                  </div>

                  <span className="hidden text-xs font-medium md:block">Preet Arora</span>

                  <ChevronDown
                     className={`h-4 w-4 text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  />
               </button>

               {showDropdown && (
                  <div className="absolute right-0 rounded-lg top-full mt-2 w-72 p-4 z-50 bg-[#FFFFFF]">
                     <div className="space-y-2">
                        <div className="pb-3 border-b border-[#D6CABC]">
                           <p className="text-sm font-semibold ">Preet Arora</p>
                        </div>

                        <div>
                           <p className="text-xs text-[#7A6B5D] mb-1">Email Address</p>
                           <div className="flex items-start gap-2">
                              <Mail className="h-4 w-4 text-[#C9A96E] shrink-0 mt-0.5" />
                              <p className="text-sm font-medium text-[#2C1810] break-all">
                                 preet.arora@example.com
                              </p>
                           </div>
                        </div>
                        <div>
                           <p className="text-xs text-[#7A6B5D] mb-1">Bank Account</p>
                           <div className="flex items-start gap-2">
                              <CreditCard className="h-4 w-4 text-[#C9A96E] shrink-0 mt-0.5" />
                              <p className="text-sm font-medium text-[#2C1810] break-all">
                                 1234 5678 9092
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
}
