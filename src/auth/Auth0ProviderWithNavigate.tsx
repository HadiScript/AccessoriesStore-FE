import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: props) => {
  // const { createUser } = useCreateMyUser();

  const navigate = useNavigate();

  const domain = "dev-0j3yuti5wb3qu02j.us.auth0.com";
  const clientID = "FAvPQBgpqsde6xuV8PJdVlQkdxiCjAHz";
  const redirectUri = "http://localhost:5173";
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // console.log(import.meta.env.VITE_AUTH0_DOMAIN);

  if (!domain || !clientID || !redirectUri || !audience) {
    throw new Error("Unable to initialise auth");
  }

  const onRedirectCallback = () => {
    // console.log(appState, user);
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
