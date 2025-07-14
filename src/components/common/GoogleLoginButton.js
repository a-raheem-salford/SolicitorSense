import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../auth/useAuth";
import HTTP_REQUEST from "@/lib/axiosConfig";
import Toaster from "./toast";
const GoogleAuth = () => {
  const { setToast, loginContext, handleLogin, handleSignup, toast } =
    useAuth();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log({ credentialResponse });

            try {
              const res = await HTTP_REQUEST.post(
                "/api/auth/google-auth",
                credentialResponse
              );
              loginContext(res.data);
              console.log("Login Success", res.data);
            } catch (err) {
              console.log(err);
              setToast({
                open: true,
                message: "Login failed",
                severity: "error",
              });
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      <Toaster toast={toast} setToast={setToast} />
    </>
  );
};
export default GoogleAuth;
