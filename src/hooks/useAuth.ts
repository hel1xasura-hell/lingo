import { useState } from "react";
import type { LoginFormValues, RegisterFormValues } from "@/types";

/**
 * Placeholder auth hook. UI calls these functions without knowing how
 * authentication is actually implemented. In Milestone 2 the bodies of
 * `login` and `register` will be replaced with real Supabase Auth calls
 * (`supabase.auth.signInWithPassword`, `supabase.auth.signUp`, etc.)
 * without any changes needed in the pages that consume this hook.
 */
export function useAuth() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(values: LoginFormValues): Promise<boolean> {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO(Milestone 2): replace with supabase.auth.signInWithPassword(values)
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (!values.email || !values.password) {
        setError("Please enter your email and password.");
        return false;
      }
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function register(values: RegisterFormValues): Promise<boolean> {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO(Milestone 2): replace with supabase.auth.signUp(values)
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { login, register, isSubmitting, error };
}
