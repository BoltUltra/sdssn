export interface RegistrationData {
  name: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  email: string;
  security_question: string;
  answer: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
