// generate a secret key to use with JWT for logging in.
function secretKey() {
  const key = [...Array(30)]
    .map((n) => ((Math.random() * 36) | 0).toString(36))
    .join("");
  return key;
}

export { secretKey };
