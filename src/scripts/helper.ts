export function validateEmail(email: string): boolean {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return passwordRegex.test(password);
}

export function isExpired(expiresAt?: number, expiresIn?: number): boolean {
  if (expiresAt === undefined) {
    throw new Error("expiresAt is required");
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp >= expiresAt + (expiresIn || 0)) {
    console.log("Token has expired.");
    return true;
  }
  console.log("Token has not expired.");
  return false;
}
