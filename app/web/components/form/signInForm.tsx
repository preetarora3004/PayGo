import { useState } from "react";
import { useNavigate } from "react-router";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { authStore } from "@workspace/store/src/store";

export default function SignInForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [passwordStrength, setPasswordStrength] = useState({
      score: 0,
      label: "",
      color: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [showConfirmPassword, setConfirmPassword] = useState(false);
   const navigate = useNavigate();
   const setSignUp = authStore((e) => e.setSignUp);

   return (
      <form className="w-full space-y-5 ">
         <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-[#2C1810]">Email</label>
            <input
               type="text"
               placeholder="xyz@email.com"
               className="bg-[#E9E1D5] border border-[#D6CABC] text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] rounded-lg inline-block text-[#2C1810] p-2"
            ></input>
         </div>

         <div className="space-y-2 flex flex-col relative">
            <label className="text-sm font-medium text-[#2C1810]">Password</label>
            <div className="relative">
               <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="bg-[#E9E1D5] border border-[#D6CABC] w-full focus:outline-none focus:ring-2 px-3 py-2 focus:ring-[#C9A96E] text-sm rounded-lg inline-block text-[#2C1810] p-2"
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6B5D] hover:text-[#2C1810] transition-colors"
               >
                  {showPassword ? (
                     <EyeOff className="h-4 w-4" />
                  ) : (
                     <Eye className="h-4 w-4" />
                  )}
               </button>
            </div>

            {showConfirmPassword && (
               <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#E0D5CA] rounded-full overflow-hidden">
                     <div
                        className={`h-full transition-all ${passwordStrength.score <= 2
                              ? "bg-red-500 w-1/3"
                              : passwordStrength.score <= 4
                                 ? "bg-yellow-500 w-2/3"
                                 : "bg-green-500 w-full"
                           }`}
                     />
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                     {passwordStrength.label}
                  </span>
               </div>
            )}
         </div>

         <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#c9a96e] text-[#2C1810] border-none hover:bg-[#C9A96E]/90 font-medium p-5 flex justify-center items-center"
         >
            {isLoading ? (
               <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
               </>
            ) : (
               "Sign in"
            )}
         </Button>

         <p className = "text-center text-[#7A6B5D] text-sm">
            Need an account? {" "} 
            <button onClick = {()=> setSignUp(true)} className = "text-[#c9a96e] hover:text-[#C9A96E] font-medium transition-all duration-200 hover:scale-105 active:scale-95">Sign up</button>
         </p>
      </form>
   );
}
