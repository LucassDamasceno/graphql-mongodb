export default () => {
  // caso queira separar ambientes só usar process.env.NODE_ENV aqui
  const { JWT_ACCESS_TOKEN_SECRET, PASSWORD_SALT_ROUNDS } = process.env;

  return {
    JWT_ACCESS_TOKEN_SECRET,
    PASSWORD_SALT_ROUNDS,
  };
};
