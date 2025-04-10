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


// Hours=1000*60*60, Minutes=1000*60, Seconds=1000
export function isExpired(time: string): boolean {
  const currentTime: Date = new Date();
  const timeElapsedInHours: number =
    (currentTime.getTime() - new Date(time).getTime()) / (1000 * 60 * 60);
  return timeElapsedInHours > 1; // 2 = 2hrs and so on
}
