import { Metadata } from "next";
import Link from "next/link";

import AuthDisplay from "@/components/auth/auth-display";
import SkipAuth from "@/components/auth/skip-auth";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Formly | Signup",
  description: "Signup and start building your forms",
};

export default function SignupPage() {
  return (
    <>
      <div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <AuthDisplay />
        <div className="lg:p-8 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-lg font-medium">
              <Icons.logo className="mr-2 h-6 w-6" />
              Formly
            </div>
            <SkipAuth authPage="signup" />
          </div>
          <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
            </div>
            <UserAuthForm formType="signup" />
            <p className="text-sm text-muted-foreground">
              By clicking Signup, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
