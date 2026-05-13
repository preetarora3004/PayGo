import { create } from "zustand";


interface authPage {
   isSignUp : boolean,
   setSignUp : (value: boolean) => void
}

export const authStore = create<authPage>((set) => ({
   
   isSignUp: false,
   setSignUp: (value: boolean) => set({isSignUp: value})
}))
