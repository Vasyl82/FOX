import React from "react";
import { FoxLoginForm } from "../forms";
import { AuthContainer } from "../containers";

const Login = () => {
  return (
    <AuthContainer>
      <FoxLoginForm />
    </AuthContainer>
  );
};

export default Login;
