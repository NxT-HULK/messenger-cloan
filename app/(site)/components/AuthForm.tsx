'use client';
import AuthSocialButton from "@/app/components/AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
type Varient = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

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
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoding(true)

        if (Varient === 'REGISTER') {
            // TODO - axios register
        }

        if (Varient === 'LOGIN') {
            // TODO - NextAuth SignIn
        }
    }

    const socialAction = (action: string) => {
        setIsLoding(true)
        // TODO - NextAuth social sign in
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {Varient === 'REGISTER' && (
                        <Input label={'Name'} register={register} id={'name'} errors={errors} type={'email'} required={false} disabled={isLoding} />
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

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {Varient === 'LOGIN' ? 'New to messenger?' : 'Already registered?'}
                    </div>
                    <div className="underline cursor-pointer" onClick={toggleVarient}>
                        {Varient === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthForm