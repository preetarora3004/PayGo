"use client";

import qr from "../assets/qr.png";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { Camera } from "lucide-react";

export function CustomerDashboard() {
   const [init, setInit] = useState(false);

   useEffect(() => {
      initParticlesEngine(async (engine) => {
         await loadFull(engine);
      }).then(() => {
         setInit(true);
      });
   }, []);

   if (!init) return null;

   return (
      <div className="min-h-screen bg-[#22333B]">
         <div className="flex p-8 gap-5">
            <div
               style={{
                  backgroundImage: `url(${qr})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
               className="w-50 h-60 relative z-10 rounded-2xl flex justify-center items-center bg-[#EAE0D5]"
            >
               <p className="text-[#5E503F]"> </p>
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden isolate bg-[#EAE0D5] group transition-all duration-300 hover:shadow-xl">
               <div className="absolute inset-0 backdrop-blur-[1px] z-1" />

               <Particles
                  className="absolute inset-0 z-0 pointer-events-none"
                  options={{
                     fullScreen: { enable: false },
                     particles: {
                        number: { value: 60 },
                        color: { value: "#22333B" },
                        links: {
                           enable: true,
                           distance: 110,
                           color: "#22333B",
                           opacity: 0.25,
                        },
                        move: {
                           enable: true,
                           speed: 0.8,
                        },
                        size: { value: 2 },
                     },
                  }}
               />

               <div className="relative z-10 flex items-center justify-center h-full font-semibold text-lg gap-2 transition-all duration-300 ease-out group-hover:-translate-y-2 text-[#5E503F]">
                  <Camera strokeWidth={2.5} />
                  <p>Pay QR / Email</p>
               </div>
            </div>
         </div>
      </div>
   );
}
