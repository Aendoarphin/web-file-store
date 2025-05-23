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


// Conversions: Hours=1000*60*60, Minutes=1000*60, Seconds=1000
export function isExpired(time: string): boolean {
  const currentTime: Date = new Date();
  const timeElapsedInHours: number =
    (currentTime.getTime() - new Date(time).getTime()) / (1000 * 60 * 60);
  return timeElapsedInHours > 1; // 2 = 2 hrs/min/s and so on
}

// Determin file type
export const getFileType = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  const typeMap: Record<string, string> = {
    'pdf': 'PDF',
    'jpg': 'Image',
    'jpeg': 'Image',
    'png': 'Image',
    'gif': 'Image',
    'svg': 'Image',
    'csv': 'CSV',
    'xlsx': 'Excel',
    'xls': 'Excel',
    'doc': 'Word',
    'docx': 'Word',
    'ppt': 'PowerPoint',
    'pptx': 'PowerPoint',
    'txt': 'Text',
    'json': 'JSON',
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'html': 'HTML',
    'css': 'CSS',
  };

  return typeMap[extension] || 'Other';
};

