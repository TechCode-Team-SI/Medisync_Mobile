export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
export const validatePasswordLength = (password: string): boolean => {
    return password.length >= 8;
};
  
export const validatePasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
};
  