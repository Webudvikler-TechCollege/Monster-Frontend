import { useForm } from "react-hook-form"
import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper"
import { fetchApi } from "../../utils/fetchApi"
import { useAuth } from '../../providers/AuthProvider'

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { loginData, setLoginData } = useAuth()

    const onSubmit = async (data) => {
        // http://localhost:3000/api/auth/login
        const url = "/auth/login"
        try {
            const result = await fetchApi(url, 'POST', data)
            //console.log(result)
            sessionStorage.setItem('access_token', JSON.stringify(result.data))
        } catch (error) {
            console.error(error);

        }

    }

    const LogOut = () => {
        sessionStorage.removeItem('access_token')
        setLoginData('')
    }

    return (
        <ContentWrapper
            title="Login"
            hidetitle={true}
            description="Login side"
        >
            {!loginData ? (
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white">Brugernavn:</label>
                        <input className="bg-white rounded-md" {...register('username', { required: true })}></input>
                        {errors.username && <span className="text-red-500">Brugernavn skal være udfyldt</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white">Adgangskode:</label>
                        <input className="bg-white rounded-md" type="password" {...register('password', { required: true })}></input>
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
        </ContentWrapper>
    )
}
