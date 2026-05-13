import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
import { authStore } from "@workspace/store/src/store";

export default function Auth() {
   const isSignUp = authStore((s) => s.isSignUp);
   return <div>{isSignUp ? <SignUp /> : <SignIn />}</div>;
}
