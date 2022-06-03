import { IAuthService } from "./auth";
import { IBackendService } from "./backend";
import { IConfigService } from "./config";

export interface ISystem {
  auth: IAuthService;
  token: string | null;
  backend: IBackendService;
  configService: IConfigService;
}
