export const checkConfiguration = (object: any) => {
  const missingEnvs = [];
  Object.keys(object).forEach((key) => {
    if (!object[key]) {
      missingEnvs.push(key);
    }
  });

  if (missingEnvs.length) {
    throw new Error(
      `missing enviroments -> ${missingEnvs.map((item) => ` ${item} `)}
      `,
    );
  }
};
