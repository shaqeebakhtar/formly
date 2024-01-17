'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import React from 'react';

const RegisterButton = () => {
  const handleSignin = () => {
    signIn('google', { callbackUrl: '/forms' });
  };

  return (
    <Button className="font-semibold rounded-lg" onClick={handleSignin}>
      <Icons.google className="w-4 h-4 mr-2" />
      Continue with Google
    </Button>
  );
};

export default RegisterButton;
