import { useForm } from "react-hook-form"
import { useAuth } from '../../providers/AuthProvider'

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { loginData, setLoginData } = useAuth()

    const onSubmit = async (formData) => {
        const url = "http://localhost:4000/api/auth/login"
        try {
            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })

            if (result.ok) {
                const token = await result.json()
                sessionStorage.setItem('access_token', JSON.stringify(token))
                setLoginData(token)
            } else {
                throw new Error('Login fejlede')
            }
            //console.log(result)
        } catch (error) {
            console.error(error);
        }
    }

    const LogOut = () => {
        sessionStorage.removeItem('access_token')
        setLoginData('')
    }

    return (
        <>
            {!loginData ? (
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white">Brugernavn:</label>
                        <input 
                            className="bg-white rounded-md" 
                            autoComplete="username" 
                            {...register('username', { required: true })} 
                        />
                        {errors.username && <span className="text-red-500">Brugernavn skal være udfyldt</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white">Adgangskode:</label>
                        <input 
                            className="bg-white rounded-md" 
                            type="password" 
                            autoComplete="current-password" 
                            {...register('password', { required: true })} 
                        />
                        {errors.password && <span className="text-red-500">Adgangskode skal være udfyldt</span>}
                    </div>
                    <button className="bg-blue-500 p-4">Send</button>
                </form>
            ) : (
                <div>
                    <p>Du er logget ind som {`${loginData.user.name}`}</p>
                    <button className="btn-primary" onClick={() => LogOut()}>Log out</button>
                </div>
            )}
        </>
    )
}
