"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/actions/register";
import Image from "next/image";
import Logo from "@/app/assets/NewProject.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import TransitionLink from "@/app/components/TransitionLink";
export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await register(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/profile?message=Registration successful");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bgLoad">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Create Account in</h1>
          <Image alt={"logo"} src={Logo} width={125} height={125} />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border rounded"
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
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <TransitionLink href="/login" className="text-amber-500">
            Sign in
          </TransitionLink>
        </p>
      </form>
    </div>
  );
}
