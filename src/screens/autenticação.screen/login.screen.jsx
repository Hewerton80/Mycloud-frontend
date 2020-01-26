import React,{Component} from 'react'
import api from '../../services/api'
import {Link } from "react-router-dom";
import {ContainerAuth} from "../../components/Containers/styled"
import driveLogo from "../../assets/img/google-drive1.png"
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            msgErroLogin:'',
            emailLogin:'',
            passwordLogin:'',
            requesting:false,
        }
   
    }
    componentDidMount(){
        window.document.title = 'login'
    }

    async login(e){
        e.preventDefault()
        const {emailLogin,passwordLogin} = this.state
        if(!emailLogin || !passwordLogin) return null
        const request = {
            email: emailLogin,
            password : passwordLogin
        }
        try{
            this.setState({requesting:true})
            const response = await api.post('auth/authenticate',request)
            this.setState({requesting:false})
            localStorage.setItem('auth-token',response.data.token)
            localStorage.setItem('user.name',response.data.user.name)
            localStorage.setItem('user.email',response.data.user.email)
            localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
            localStorage.setItem('id.trash',response.data.user.folders[1]._id)
            this.props.history.push(`/drive/${response.data.user.folders[0]._id}`)
            
        }
        catch(err){
            console.log(Object.getOwnPropertyDescriptors(err))
            this.setState({requesting:false})
            if(err.message === 'Network Error'){
                this.setState({msgErroLogin:'Falha na conexão com o servidor'})
            }
            else if(err.response && err.response.status === 400){
                this.setState({msgErroLogin:'Email e/ou senha inválidas'})
            }
            else{
                this.setState({msgErroLogin:'Erro no login'})
            }
        }

    }
    render(){
        const {msgErroLogin,requesting, emailLogin ,passwordLogin} = this.state
        return(
            <ContainerAuth>
                <form onSubmit={e=>{this.login(e)}}>
                    <img src={driveLogo} alt="Drive"/>
                    <h2>Login</h2>
                    <span id="erroLogin">{msgErroLogin}</span>
                    <label htmlFor="EmailLogin">E-mail</label>
                    <input 
                        id="EmailLogin"
                        type="text"
                        placeholder="E-mail"
                        value={emailLogin}
                        onChange={(e)=>this.setState({emailLogin:e.target.value})}
                        required
                    />
                    <label htmlFor="passwordLogin">Password</label>
                    <input 
                        id="passwordLogin"
                        type="password"
                        placeholder="Senha"
                        value={passwordLogin}
                        onChange={e=>this.setState({passwordLogin:e.target.value})}
                        required
                    />
                    <span id="footer">
                        <Link to="/register" >Criar conta</Link>
                        <button 
                            type="submit" 
                            loading={requesting?"disabled":""}
                            disabled={requesting?"disabled":""}
                        >
                            Entrar
                        </button>
                    </span>
                </form>
            </ContainerAuth>
        )
    }
}
