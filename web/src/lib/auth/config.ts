import { WebStorageStateStore, type UserManagerSettings } from "oidc-client-ts";

// OAuth hosted UI domain (e.g., "myapp.auth.ca-central-1.amazoncognito.com")
const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
// Issuer URL (e.g., "https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_xxxxx")
const cognitoIssuer = process.env.NEXT_PUBLIC_COGNITO_ISSUER;
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const oidcConfig: UserManagerSettings & { clientId: string } = {
  authority: cognitoIssuer || `https://${cognitoDomain}`,
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
        issuer: cognitoIssuer || `https://${cognitoDomain}`,
        authorization_endpoint: `https://${cognitoDomain}/oauth2/authorize`,
        token_endpoint: `https://${cognitoDomain}/oauth2/token`,
        userinfo_endpoint: `https://${cognitoDomain}/oauth2/userInfo`,
        end_session_endpoint: `https://${cognitoDomain}/logout`,
        jwks_uri: `${cognitoIssuer}/.well-known/jwks.json`,
      }
    : undefined,
};
