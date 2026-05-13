import React, { useState } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";

const contacts = [
   { name: "Harminder", email: "harminder.m@email.com", initials: "HM" },
   { name: "Paaji Johnson", email: "paaji.j@email.com", initials: "PJ" },
   { name: "Oggy Wilson", email: "oggy.w@email.com", initials: "OW" },
   { name: "Michael Sharma", email: "m.sharma@email.com", initials: "MS" },
   { name: "Jonathan", email: "jonathan@email.com", initials: "JJ" },
];

export function PayByEmail() {
   const [query, setQuery] = useState("");
   const [selectedContact, setSelectedContact] = useState<
      (typeof contacts)[0] | null
   >(null);
   const [amount, setAmount] = useState("");

   const getFilteredContacts = () => {
      if (!query) return [];
      try {
         const regex = new RegExp(query, "i");
         return contacts.filter((c) => regex.test(c.name)).slice(0, 4);
      } catch {
         return contacts
            .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 4);
      }
   };

   const filtered = getFilteredContacts();

   const handleSend = () => {
      if (selectedContact && amount) {
         setSelectedContact(null);
         setAmount("");
         setQuery("");
      }
   };

   return (
      <div className="rounded-2xl bg-[#ffffff] p-5 shadow-sm">
         <h3 className="text-sm font-semibold text-[#0a0a0a]">
            Pay by Email
         </h3>

         {selectedContact ? (
            <div className="mt-3 space-y-3">
               <div className="flex items-center gap-3 rounded-xl bg-[#F5F0EB] p-3">
                  <div className="h-9 w-9 flex justify-center items-center">
                     <div className="bg-[#f1e8db] text-[#CAAB72] text-xs font-semibold p-2 rounded-full">
                        {selectedContact.initials}
                     </div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-[#0a0a0a] truncate">
                        {selectedContact.name}
                     </p>
                     <p className="text-xs text-[#737373] truncate">
                        {selectedContact.email}
                     </p>
                  </div>
                  <button
                     onClick={() => setSelectedContact(null)}
                     className="rounded-full p-1 hover:bg-[#FFFFFF] transition-colors"
                     aria-label="Clear selection"
                  >
                     <X className="h-3.5 w-3.5 text-[#737373]" />
                  </button>
               </div>
               <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-[#737373]">
                     $
                  </span>
                  <input
                     type="text"
                     placeholder="0.00"
                     value={amount}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAmount(e.target.value)
                     }
                     className="w-full rounded-xl border border-[#D6CABC] bg-[#f5f5f5]/50 py-3 pl-8 pr-4 text-lg font-semibold text-[#0a0a0a] placeholder:text-[#737373]/50 focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]"
                  />
               </div>
               <button
                  onClick={handleSend}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full gap-2 rounded-xl bg-[#968B87] h-11 px-8 text-[#fafafa] hover:bg-[#968B87]/90 font-semibold flex items-center justify-center"
               >
                  <ArrowUpRight className="h-4 w-4" />
                  Send Payment
               </button>
            </div>
         ) : (
            <div className="mt-3 space-y-2">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
                  <input
                     type="text"
                     placeholder="Search by name or email..."
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     className="w-full rounded-xl border border-[#D6CABC] bg-[#FAF8F4]/50 py-2.5 pl-9 pr-4 text-sm text-[#0a0a0a] placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  />
               </div>
               {query.length > 0 && (
                  <div className="max-h-56 space-y-0.5 overflow-y-auto rounded-xl bg-[#F9F7F5]/50 p-1">
                     {filtered.length > 0 ? (
                        filtered.map((contact) => (
                           <button
                              key={contact.email}
                              onClick={() => {
                                 setSelectedContact(contact);
                                 setQuery("");
                              }}
                              className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-[#ffffff]"
                           >
                              <div className="h-8 w-8 flex items-center justify-center">
                                 <div className="bg-[#F1E9DB] text-[#D2B888] text-xs font-semibold p-2 rounded-full">
                                    {contact.initials}
                                 </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                 <p className="text-sm font-medium text-[#0a0a0a] truncate">
                                    {contact.name}
                                 </p>
                                 <p className="text-xs text-[#737373] truncate">
                                    {contact.email}
                                 </p>
                              </div>
                           </button>
                        ))
                     ) : (
                        <div className="py-4 text-center">
                           <p className="text-xs text-[#737373]">
                              No contacts found
                           </p>
                           <p className="mt-0.5 text-xs text-[#f5f5f5]">
                              Send to &quot;{query}&quot; directly
                           </p>
                        </div>
                     )}
                  </div>
               )}
               {query.length === 0 && (
                  <p className="pt-1 text-xs text-[#737373]">
                     Search for a contact to start a payment
                  </p>
               )}
            </div>
         )}
      </div>
   );
}
