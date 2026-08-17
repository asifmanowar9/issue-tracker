"use client";

import { useForm } from "react-hook-form";

import { createClient } from "@/lib/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const supabase = createClient();

  async function onSubmit(data: RegisterFormValues) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        }
      }
    });

    if (error) {
      console.error(error);
      return;
    } 
    console.log("User registered successfully");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* fields will go here */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
        {errors.fullName && (
            <p className="text-sm text-red-500">
                {errors.fullName.message}
                </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
            <p className="text-sm text-red-500">
                {errors.email.message}
                </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password",{
            required: "Password is required",
          })}
        />
        {errors.password && (
            <p className="text-sm text-red-500">
                {errors.password.message}
                </p>
        )}
      </div>
      <Button type="submit">Create Account</Button>
    </form>
  );
}