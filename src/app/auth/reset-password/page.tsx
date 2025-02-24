import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password - TalentBridge',
  description: 'Set a new password for your TalentBridge account',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}