import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function Component() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <SignInForm />
    </div>
  );
}
