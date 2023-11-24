"use client";

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface AuthFormProps {}

export default function AuthForm({}: AuthFormProps) {
  const { session } = useSessionContext();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={[]}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#3E46F5",
              brandAccent: "#0000F5",
            },
          },
        },
      }}
      theme="light"
    />
  );
}
