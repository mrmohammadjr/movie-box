"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Logo from "@/app/assets/NewProject.png";
import Image from "next/image";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import TransitionLink from "@/app/components/TransitionLink";
export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const errorParam = searchParams.get("error");
  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password.",
    OAuthAccountNotLinked:
      "Account already exists with a different sign-in method.",
    AccessDenied: "Access denied.",
    Configuration: "Authentication configuration error.",
    Callback: "Authentication callback failed.",
    Verification: "Verification failed.",
  };

  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        console.log(result)
        const friendly =
          errorMessages[result.error] || "Sign in failed. Please try again.";
        setErrors(friendly);
        setLoading(false);
        return;
      }
      if (result?.ok) {
        router.push("/profile");
      } else {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors("An unknown error occurred.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bgLoad">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <Image alt={"logo"} src={Logo} width={125} height={125} />
        </div>

        {message && <div className="text-green-500">{message}</div>}
        {errorParam && (
          <div className="text-red-500">
            {errorMessages[errorParam] || "Authentication error."}
          </div>
        )}
        {errors && <div className="text-red-500">{errors}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border rounded outline-none"
        />
        <div className="flex justify-between items-center p-2 border rounded">
          <input
            type={`${showPass?"text":"password"}`}
            name="password"
            placeholder="Password"
            required
            className="outline-none w-full"
          />
          {showPass ? (
            <FaEyeSlash onClick={()=> setShowPass((l)=> !l)} className="text-xl cursor-pointer" />
          ) : (
            <IoEyeSharp onClick={()=> setShowPass((l)=> !l)} className="text-xl cursor-pointer" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-amber-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center">
          Dont have an account?{" "}
          <TransitionLink href="/signup" className="text-amber-500">
            Create one
          </TransitionLink>
        </p>
      </form>
    </div>
  );
}
