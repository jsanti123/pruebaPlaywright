export function generateRandomString(length: number = 20): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

export function generateRandomStatus(): string {
    const status = ['Draft', 'Active', 'Review', 'Inactive'];
    return status[Math.floor(Math.random() * status.length)];
  }

export function generateRandomResposiblePerson(): string {
    const status = ['Admin', 'Sanitago Posada Florez', 'Marcelo'];
    return status[Math.floor(Math.random() * status.length)];
  }

export function generateRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
  