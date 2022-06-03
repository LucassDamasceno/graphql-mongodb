import { createContainer } from "awilix";

import { ISystem } from "./protocols/system";
import { createAuthService } from "./services/auth";
import { createBackendService } from "./services/backend";
import { createConfigService } from "./services/config";

export const system = createContainer<ISystem, any>().register({
  auth: createAuthService(),
  backend: createBackendService(),
  configService: createConfigService(),
});
