"use server";

import { auth } from "@/lib/auth";
import { ServerValidateError, createServerValidate } from "@tanstack/react-form-nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInFormOpts } from "./components/sign-in-form";
import { signInFormSchema } from "./schema/sign-in-schema";

const serverValidate = createServerValidate({
  ...signInFormOpts,
  onServerValidate: ({ value }) => {
    const result = signInFormSchema.safeParse(value);

    if (!result.success) {
      return result.error.issues.map((issue) => issue.message);
    }
  },
});

export default async function signInAction(prev: unknown, formData: FormData) {
  try {
    const validatedData = await serverValidate(formData);
    await auth.api.signInEmail({
      body: validatedData,
      headers: await headers(),
    });
  } catch (e) {
    if (!(e instanceof ServerValidateError)) {
      return {
        errors: [["formError", "Email atau password salah"]],
      };
    }
    return e.formState;
  }
  redirect("/dashboard");
}
