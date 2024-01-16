'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Register = () => {
  const { data: session } = useSession();

  if (session?.user) {
    redirect('/forms');
  }

  const handleSignin = () => {
    signIn('google', { callbackUrl: '/forms' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full overflow-hidden max-w-md shadow-sm border rounded-xl">
        <div className="flex flex-col items-center justify-center space-y-6 border-b px-12 py-8 text-center">
          <Icons.logo />
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Welcome to Formly</h3>
            <p className="text-sm text-muted-foreground">
              Create/Login with your Google account to start building out forms.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3 px-8 py-8 sm:px-16 bg-zinc-50">
          <Button className="font-semibold rounded-lg" onClick={handleSignin}>
            <Icons.google className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
