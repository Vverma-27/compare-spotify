export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "8ba59f9588b74c729fa1a97e777f4499";
export const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://compare-spotify.vercel.app/"
    : "http://localhost:3000";
export const scopes = [
  "user-top-read",
  // "user-read-currently-playing",
  // "user-read-playback-state",
];
