"use client"
import Link from "next/link"
import React from 'react';
import {useForm} from 'react-hook-form';
import Cookies from 'js-cookie'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
export default function LoginPage(){
  const {register, handleSubmit, formState: {errors}} = useForm();
  const router = useRouter();
  async function sendData(values) {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email : values.email,
        password : values.password,
      })
      console.log(result);
      if (result.error) {
        console.log('failed')
      }
      if (result.status == 200) {
        Cookies.set('auth', 'authenticated', { expires: 7, path: '' })
        router.push("/")
      }
      if (result.status == 401) {
        alert('no account')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
    <form className="flex flex-col text-white place-items-center" onSubmit={handleSubmit(sendData)}>
      <label>ایمیل</label>
      <input type="email" className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" {...register('email', {
        required: 'این فیلد اجباری است',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          message: 'لطفا یک ایمیل صحیح وارد کنید'
        }
      })}/>
      {errors.email && <p>{errors.email.message}</p>}

      <label>رمز عبور</label>
      <input type="password" className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" {...register('password', {
        required: 'این فیلد اجباری است',
        minLength: {
          value: 6,
          message: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
        }
      })}/>
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" className="m-1.5">ورود</button>
    </form>
            <h1 className="text-white text-center">
    اگر حساب کاربری ندارید
      <Link className="text-cyan-500 mr-1" href={"/signup"}>ثبت نام کنید </Link>
      </h1>
    </div>
  );
};