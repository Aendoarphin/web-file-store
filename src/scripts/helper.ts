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

export function checkTimeElapsed(time: string): void {
  const currentTime: Date = new Date();
  const timeElapsed: number = (currentTime.getTime() - new Date(time).getTime()) / (1000 * 60 * 60);
  if (timeElapsed >= 1) {
    console.log("expired");
  }
}

// Example usage:
const time: string = "2025-04-08T18:01:52.534816385Z";
checkTimeElapsed(time);


