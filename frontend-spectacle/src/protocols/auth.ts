export interface IAuthService {
  signIn: (email: string, password: string) => Promise<any>;
}
