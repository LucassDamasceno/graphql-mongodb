import { asClass, Resolver } from "awilix";

import { IAuthService } from "../protocols/auth";
import { IBackendService } from "../protocols/backend";
import { ISystem } from "../protocols/system";

export class AuthService implements IAuthService {
  backend: IBackendService;

  constructor({ backend }: Pick<ISystem, "backend">) {
    this.backend = backend;
  }

  async signIn(email: string, password: string): Promise<void> {
    const res = await this.backend.post("auth/login", {
      email,
      password,
    });

    return res;
  }
}

export const createAuthService = (): Resolver<IAuthService> =>
  asClass(AuthService).singleton();
