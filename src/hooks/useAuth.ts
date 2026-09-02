import { useState } from "react";
import type { LoginFormValues, RegisterFormValues } from "@/types";
import { signIn, signUp } from "@/lib/auth";

export function useAuth() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(values: LoginFormValues): Promise<boolean> {
    setIsSubmitting(true);
    setError(null);

    try {
      await signIn(values.email, values.password);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to log in.";

      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function register(values: RegisterFormValues): Promise<boolean> {
    setIsSubmitting(true);
    setError(null);

    try {
      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }

      await signUp(values.email, values.password);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to create your account.";

      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    login,
    register,
    isSubmitting,
    error,
  };
                 }
