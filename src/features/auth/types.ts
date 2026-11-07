export type UserRole = 'guest' | 'partner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  login: (role: UserRole, customName?: string) => void;
  logout: () => void;
}
