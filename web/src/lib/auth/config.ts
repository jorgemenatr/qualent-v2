import { WebStorageStateStore, type UserManagerSettings } from "oidc-client-ts";

const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const oidcConfig: UserManagerSettings & { clientId: string } = {
  authority: `https://${cognitoDomain}`,
  client_id: clientId || "",
  clientId: clientId || "",
  redirect_uri: `${appUrl}/auth/callback`,
  post_logout_redirect_uri: appUrl,
  response_type: "code",
  scope: "openid email profile",
  automaticSilentRenew: true,
  loadUserInfo: true,
  userStore:
    typeof window !== "undefined"
      ? new WebStorageStateStore({ store: window.localStorage })
      : undefined,
  metadata: cognitoDomain
    ? {
        issuer: `https://${cognitoDomain}`,
        authorization_endpoint: `https://${cognitoDomain}/oauth2/authorize`,
        token_endpoint: `https://${cognitoDomain}/oauth2/token`,
        userinfo_endpoint: `https://${cognitoDomain}/oauth2/userInfo`,
        end_session_endpoint: `https://${cognitoDomain}/logout`,
        jwks_uri: `https://${cognitoDomain}/.well-known/jwks.json`,
      }
    : undefined,
};
