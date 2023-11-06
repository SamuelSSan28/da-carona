import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <SignIn setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </>
  );
}
