import { asClass, BuildResolver } from "awilix";

import { IConfigService } from "../protocols/config";

export class ConfigService implements IConfigService {
  backendUri = process.env.REACT_APP_BACKEND_URI as string;
}

export const createConfigService = (): BuildResolver<ConfigService> =>
  asClass(ConfigService).singleton();
