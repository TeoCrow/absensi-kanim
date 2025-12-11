"use client";

import LogoKanim from "@/../public/images/logo-kanim.png";
import { Button, Card, CardBody, CardHeader, cn, Input } from "@heroui/react";
import { formOptions, mergeForm, useForm } from "@tanstack/react-form";
import { initialFormState, useTransform } from "@tanstack/react-form-nextjs";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useActionState, useState } from "react";
import z from "zod";
import signInAction from "../auth-actions";
import { signInFormSchema } from "../schema/sign-in-schema";

export const signInFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  } as z.infer<typeof signInFormSchema>,
});

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isVisible, setIsVisible] = useState(false);
  const [state, action, isPending] = useActionState(signInAction, initialFormState);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    ...signInFormOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
  });

  return (
    <div className={cn("w-full max-w-sm md:max-w-xl", className)} {...props}>
      <Card fullWidth>
        <CardHeader className="items-center flex flex-col">
          <div>
            <Image src={LogoKanim} width={70} height={70} alt="logo kanim" />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-large font-medium">Sign in to your account</h1>
            <p className="text-small text-default-500">to continue to Absensi</p>
          </div>
        </CardHeader>
        <CardBody>
          <form action={action as never} onSubmit={() => form.handleSubmit()} className="flex flex-col gap-3">
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="email"
                    placeholder="Masukkan email anda"
                  />
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    isRequired
                    endContent={
                      <Button
                        type="button"
                        onPress={toggleVisibility}
                        isIconOnly
                        size="sm"
                        radius="full"
                        variant="light"
                        className="text-default-400 text-2xl"
                      >
                        {isVisible ? <Eye /> : <EyeClosed />}
                      </Button>
                    }
                    type={isVisible ? "text" : "password"}
                    placeholder="Masukkan password anda"
                  />
                );
              }}
            </form.Field>
            <form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
              {([canSubmit]) => (
                <Button color="primary" type="submit" disabled={!canSubmit || isPending} isLoading={isPending}>
                  Login
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
