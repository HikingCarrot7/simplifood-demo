export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  token: string;
  refreshToken: string;
}
