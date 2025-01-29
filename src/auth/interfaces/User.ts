export interface UserCreation {
  username: string;
  password: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  created: string;
}

export interface UserLogin {
  username: string;
  password: string;
  remember_me?: boolean;
  grant_type: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  user: User;
}
