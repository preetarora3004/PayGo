import { useState } from "react";
import { ScanLine, Copy, Check, RefreshCw, X } from "lucide-react";

export default function QRScanner() {
   const [mode, setMode] = useState<"myqr" | "scan">("myqr");
   const [copied, setCopied] = useState(false);
   const [showCameraModal, setShowCameraModal] = useState(false);

   const handleCopy = () => {
      //  navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-xl">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#2C1810]">QR Payment</h3>

            <div className="rounded-lg flex bg-[#F5F0EB] p-0.5">
               <button
                  onClick={() => setMode("myqr")}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${mode === "myqr"
                        ? "bg-[#FFFFFF] text-[#2C1810] shadow-sm"
                        : "text-[#7a6b5d] hover:text-[#3C2921]"
                     }`}
               >
                  My QR
               </button>
               <button
                  onClick={() => setMode("scan")}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${mode === "scan"
                        ? "bg-[#FFFFFF] text-[#2C1810] shadow-sm"
                        : "text-[#7a6b5d] hover:text-[#3F2C25]"
                     }`}
               >
                  Scan
               </button>
            </div>
         </div>

         {mode === "myqr" ? (
            <div className="mt-4 flex flex-col items-center">
               <div className="rounded-2xl border-2 border-dashed border-border bg-secondary/50 p-4">
               </div>
               <p className="mt-3 text-xs text-muted-foreground">
                  Share this QR code to receive payments
               </p>
               <button
                  onClick={handleCopy}
                  className="mt-1 gap-1.5 text-xs text-accent hover:text-accent/80"
               >
                  {copied ? (
                     <>
                        <Check className="h-3 w-3" /> Copied
                     </>
                  ) : (
                     <>
                        <Copy className="h-3 w-3" /> Copy Payment ID
                     </>
                  )}
               </button>
            </div>
         ) : (
            <div className="mt-4 flex flex-col items-center">
               <div className="relative flex h-[172px] w-[172px] items-center justify-center rounded-2xl bg-[#F4F3F3] border-2 border-dashed border-[#D6CABC]">
                  <ScanLine className="h-12 w-12 text-[#CAAB71] animate-pulse" />
                  <div className="absolute inset-4 rounded-lg border-2 border-[#E7DCCB]" />
                  {/* Corner markers */}
                  <div className="absolute left-3 top-3 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-[#C9A96E]" />
                  <div className="absolute right-3 top-3 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-[#C9A96E]" />
                  <div className="absolute bottom-3 left-3 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-[#C9A96E]" />
                  <div className="absolute bottom-3 right-3 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-[#C9A96E]" />
               </div>
               <p className="mt-3 text-xs text-[#7A6B5D]">
                  Point your camera at a QR code
               </p>
               <button
                  onClick={() => setShowCameraModal(true)}
                  className="mt-1 gap-1.5 text-xs text-[#7A6B5D] hover:text-[#2C1810] flex items-center rounded-xl h-7 px-2 hover:font-bold hover:bg-[#C9A96E] transition-all"  
                  >
                     <RefreshCw className="h-3 w-3" /> <p>Open Camera</p>
                  </button>
            </div>
         )}

         {/* Camera Scanning Modal */}
         {showCameraModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
               <div className="bg-[#FFFFFF] rounded-2xl shadow-xl w-full max-w-md p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h2 className="text-lg font-semibold text-[#2C1810]">
                        Scan QR Code
                     </h2>
                     <button
                        onClick={() => setShowCameraModal(false)}
                        className="text-[#7A6B5D] hover:text-card-foreground transition-colors"
                        aria-label="Close"
                     >
                        <X className="h-6 w-6" />
                     </button>
                  </div>

                  <div className="bg-[#E0D5CA] rounded-lg aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <ScanLine className="h-16 w-16 text-[#D5BE9B] animate-pulse" />
                        <div className="absolute inset-12 rounded-lg border-2 border-[#D4BF9C]" />
                     </div>
                  </div>

                  <p className="text-sm text-[#7A6B5D] text-center mb-4">
                     Position the QR code in the frame to scan
                  </p>

                  <button
                     onClick={() => setShowCameraModal(false)}
                     className="w-full bg-[#c9a96e] text-[#2C1810] hover:bg-[#CFB27D] px-2 h-9 rounded-lg "
                  >
                     Close Scanner
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
