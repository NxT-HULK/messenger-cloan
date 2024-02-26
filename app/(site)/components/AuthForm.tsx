'use client';
import AuthSocialButton from "@/app/components/AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
type Varient = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const session = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

    const [Varient, setVarient] = useState<Varient>('LOGIN')
    const [isLoding, setIsLoding] = useState(false)

    const toggleVarient = useCallback(() => {
        if (Varient === 'LOGIN') {
            setVarient('REGISTER')
        } else {
            setVarient('LOGIN')
        }
    }, [Varient])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            image: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoding(true)

        if (Varient === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => { signIn('credentials', data) })
                .catch(() => { toast.error('Somthing went wrong!') })
                .finally(() => { setIsLoding(false) })
        }

        if (Varient === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }
            }).finally(() => {
                setIsLoding(false)
            })
        }
    }

    const socialAction = (action: string) => {
        setIsLoding(true)
        signIn(action, {
            redirect: false,
        })
            .then((callback) => {

                if (callback?.error) {
                    toast.error('Invalid credential')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in!')
                    router.push('/users')
                }
            }).catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoding(false)
            })
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="post">
                    {Varient === 'REGISTER' && (
                        <Input label={'Name'} register={register} id={'name'} errors={errors} type={'text'} required={false} disabled={isLoding} />
                    )}

                    <Input label={'Email address'} register={register} id={'email'} errors={errors} type={'email'} required={false} disabled={isLoding} />
                    <Input label={'Password'} register={register} id={'password'} errors={errors} type={'password'} required={false} disabled={isLoding} />

                    <div>
                        <Button disabled={isLoding} fullWidth type={'submit'}>
                            {Varient === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>

                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or Continue With</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => { socialAction('github') }} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => { socialAction('google') }} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        <span className="text-ellipsis">
                            {Varient === 'LOGIN' ? 'New to messenger?' : 'Already registered?'}
                        </span>
                    </div>
                    <div className="underline cursor-pointer" onClick={toggleVarient}>
                        <span className="text-ellipsis">
                            {Varient === 'LOGIN' ? 'Create an account' : 'Login'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm