import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormValues } from "@/types";

const initialValues: LoginFormValues = { email: "", password: "", rememberMe: false };

export function Login() {
  const navigate = useNavigate();
  const { login, isSubmitting, error } = useAuth();
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof LoginFormValues, string>> = {};
    if (!values.email) nextErrors.email = "Email is required.";
    if (!values.password) nextErrors.password = "Password is required.";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const success = await login(values);
    if (success) navigate("/dashboard");
  }

  return (
    <AuthLayout>
      <Card className="animate-fade-slide-up">
        <h1 className="font-display text-2xl font-semibold">Welcome back 💗</h1>
        <p className="mt-1 text-sm text-plum-400">Continue your English learning journey.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={fieldErrors.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            error={fieldErrors.password}
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
          />

          <label className="flex items-center gap-2 text-sm text-plum-500 dark:text-plum-100">
            <input
              type="checkbox"
              checked={values.rememberMe}
              onChange={(event) => setValues((prev) => ({ ...prev, rememberMe: event.target.checked }))}
              className="h-4 w-4 rounded border-plum-300 text-rose-500 focus:ring-rose-400"
            />
            Remember me
          </label>

          {error && (
            <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-plum-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-rose-600 hover:underline dark:text-rose-300">
            Register
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
