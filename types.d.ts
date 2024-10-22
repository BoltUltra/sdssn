export interface RegistrationData {
  username: string;
  password: string;
  confirm_password: string;
  fullName: string;
  email: string;
  phoneNo: string;
  securityQuestion: string;
  answer: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
