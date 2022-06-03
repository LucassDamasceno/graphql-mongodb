import { useMemo } from "react";

import { ISystem } from "../protocols/system";
import { system } from "../system";

export const useSystem = (): ISystem => {
  return useMemo(() => system.cradle, []);
};
