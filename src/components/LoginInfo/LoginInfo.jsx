import { useAuth } from "../../providers/AuthProvider"

export const LoginInfo = () => {
    const { loginData, setLoginData } = useAuth()

    return (
        <div className="text-white">
            {loginData ? (
                <>
                    <span>
                        Bruger: {loginData.user.name}
                    </span>

                    <button onClick={() => setLoginData(null)} title="Log ud">Log ud</button>
                </>
            ) : (
                <p>Du er ikke logget ind</p>
            )}
        </div>
    )
}
