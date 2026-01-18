import { useField } from "../../hooks/customHooks"
import { login } from "../../api/auth"
import { useNavigate } from "react-router-dom"

const LoginForm = ()=>{
    const navigate = useNavigate
    const username = useField('text')
    const password = useField('text')

    const handleLogin = async (e) =>{
        e.preventdefault()

        const user = await login(username.value, password.value)

        if(!user){
            throw new Error('user not here')
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <div>
            <form className="login" onSubmit={handleLogin}>
                username <input name="username" {...username} autocomplete="given-name"/>
                <p></p>
                password <input name="password" {...password}/>
                <button>Log in</button>
            </form>
        </div>
    )
}

export default LoginForm