import SignInForm from "../../../components/form/signInForm";

export default function SignIn() {

   return (
      <div className="min-h-screen bg-[#E9E1D5] flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            <div className="space-y-6">
               <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2C1810] ">
                        <span className="text-lg font-bold text-[#FAFAF8]">P</span>
                     </div>
                     <h2 className="text-2xl font-semibold">PayGo</h2>
                  </div>

                  <h1 className="text-2xl font-bold text-[#2C1810]">
                     Create Account
                  </h1>
                  <p className="text-sm text-[#7A6B5D]">
                     Sign in to your PayGo account to continue
                  </p>
               </div>
               <div className="rounded-2xl p-6 bg-[#FFFFFF] border border-[#D6CABC] shadow-sm">
                  <SignInForm />
               </div>
            </div>
         </div>
      </div>
   );
}
