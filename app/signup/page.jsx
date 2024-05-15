"use client"
import {useForm} from 'react-hook-form';
import Link from "next/link"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
export default function SignupPage(){
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter();
    const notify = (msg) => { 
      Swal.fire({
        text: msg,
        icon: "error"
         });
    }
    async function sendData(values) {
        const response = await fetch("/api/signup",{
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        })
        const {res} = await response.json()
        console.log(res);
        if (res == "Email is already in use") {
          notify("این ایمیل قبلا استفاده شده")
        }
        if (res == "user added") {
          notify("ثبت نام با موفقیت انجام شد")
          setTimeout(function() {
            router.push("/login")
          }, 2000);
        }
    }
    return (
      <div className="flex flex-col text-white place-items-center">
        <h1>ثبت نام در مووی باکس</h1>
        <form onSubmit={handleSubmit(sendData)} className="flex flex-col text-white place-items-center">

            <input type="text" name="username" placeholder="نام کاربری" {...register('username', {required: true})} className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1"/>
            {errors.username && <span>This field is required</span>}

            <input type="email" name="email" placeholder="ایمیل" {...register('email', {required: true})} className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" />
            {errors.email && <span>This field is required</span>}

            <input type="password" name="password" placeholder="رمز عبور" {...register('password', {required: true})} className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" />
            {errors.password && <span>This field is required</span>}
            <input type="password" name="confirmpassword" placeholder="تایید رمز عبور" {...register('confirmpassword', {required: true})} className="bg-transparent rounded border-2 text-cyan-200 p-0.5 mt-1" />
            {errors.password && <span>This field is required</span>}
            <button type="submit">ثبت نام</button>
        </form>   
        <h1 className="text-white text-center">
    اگر حساب کاربری دارید
      <Link className="text-cyan-500 mr-1" href={"/login"}>ورود کنید </Link>
    </h1>
      </div>
    );
};