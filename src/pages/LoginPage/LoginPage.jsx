import { useForm } from "react-hook-form"
import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper"
import { fetchApi } from "../../utils/fetchApi"
import { useAuth } from '../../providers/AuthProvider'
import { LoginForm } from "../../components/LoginForm/LoginForm"

export const LoginPage = () => {

    return (
        <ContentWrapper
            title="Login"
            hidetitle={true}
            description="Login side"
        >
            <LoginForm />
        </ContentWrapper>
    )
}
