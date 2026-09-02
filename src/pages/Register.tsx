import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterFormValues } from "@/types";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function Register() {
  const navigate = useNavigate();
  const { register, isSubmitting, error } = useAuth();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});

  function update<K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof RegisterFormValues, string>> = {};
    if (!values.username) nextErrors.username = "Choose a username.";
    if (!values.email) nextErrors.email = "Email is required.";
    if (values.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords don't match.";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const success = await register(values);
    if (success) navigate("/profile-setup");
  }

  return (
    <AuthLayout>
      <Card className="animate-fade-slide-up">
        <h1 className="font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-plum-400">Start your English learning journey today.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Username"
            autoComplete="username"
            value={values.username}
            error={fieldErrors.username}
            onChange={(event) => update("username", event.target.value)}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={fieldErrors.email}
            onChange={(event) => update("email", event.target.value)}
          />
          <div className="flex flex-col gap-2">
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              error={fieldErrors.password}
              onChange={(event) => update("password", event.target.value)}
            />
            <PasswordStrength password={values.password} />
          </div>
          <Input
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            error={fieldErrors.confirmPassword}
            onChange={(event) => update("confirmPassword", event.target.value)}
          />

          {error && (
            <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-plum-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-rose-600 hover:underline dark:text-rose-300">
            Log in
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
