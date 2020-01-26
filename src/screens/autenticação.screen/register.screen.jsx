import React,{Component} from 'react'
import api from '../../services/api'
import {Link } from "react-router-dom";
import {ContainerAuth} from "../../components/Containers/styled"
import driveLogo from "../../assets/img/google-drive1.png"

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            nameRegister:'',
            emailRegister:'',
            passwordRegister:'',
            confirmPasswordRegister:'',
            requesting:false,
        }
    }
    componentDidMount(){
        window.document.title = 'register'
    }

    register = async e => {
        e.preventDefault()
        this.setState({msgErroRegister:''})
        const {nameRegister,emailRegister,passwordRegister,confirmPasswordRegister} = this.state
        if(!nameRegister || !emailRegister || !passwordRegister || !confirmPasswordRegister) return null
        if(passwordRegister!==confirmPasswordRegister){
            this.setState({msgErroRegister:"As senhas estão diferentes"})
            return null
        }
        if(passwordRegister.length<6){
            this.setState({msgErroRegister:"Senha deve ter no mínimo 6 caractéres"})
            return null
        }
        const request = {
            name:nameRegister,
            email:emailRegister,
            password:passwordRegister
        }
        try{
            this.setState({requesting:true})
            const response = await api.post('auth/register',request)
            localStorage.setItem('auth-token',response.data.token)
            localStorage.setItem('user.name',response.data.user.name)
            localStorage.setItem('user.email',response.data.user.email)
            localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
            localStorage.setItem('id.trash',response.data.user.folders[1]._id)
            this.props.history.push(`/drive/${response.data.user.folders[0]._id}`)
            
        }
        catch(err){
            this.setState({requesting:false})
            if(err.message === 'Network Error'){
                this.setState({msgErroRegister:'Falha na conexão com o servidor'})
            }
            else if(err.response && err.response.status === 400){
                this.setState({msgErroRegister:'Já existe um usuário cadastrado com o email informado'})
            }
            else{
                this.setState({msgErroRegister:'Erro no cadastro'})
            }
            //console.log(Object.getOwnPropertyDescriptors(err));
        }
    }

    render(){
        const {msgErroRegister,requesting} = this.state
        const {emailRegister,nameRegister,passwordRegister,confirmPasswordRegister} = this.state
        return(
            <ContainerAuth>
                <form onSubmit={e=>{this.register(e)}}>
                    <img src={driveLogo} alt="Drive"/>
                    <h2>Cadastro</h2>
                    <span id="erroLogin">{msgErroRegister}</span>
                    <label htmlFor="nameRegister">Nome</label>
                    <input 
                        id="nameRegister"
                        type="text"
                        placeholder="Nome"
                        value={nameRegister}
                        onChange={(e)=>this.setState({nameRegister:e.target.value})}
                        required
                    />
                    <label htmlFor="emailRegister">E-mail</label>
                    <input 
                        id="emailRegister"
                        type="email"
                        placeholder="E-mail"
                        value={emailRegister}
                        onChange={(e)=>this.setState({emailRegister:e.target.value})}
                        required
                    />
                    <label htmlFor="passwordRegister">Password</label>
                    <input 
                        id="passwordRegister"
                        type="password"
                        placeholder="Senha"
                        value={passwordRegister}
                        onChange={e=>this.setState({passwordRegister:e.target.value})}
                        required
                    />
                    <label htmlFor="confirmAasswordRegister">Confirmação do password</label>
                    <input 
                        id="confirmPasswordRegister"
                        type="password"
                        placeholder="Senha"
                        value={confirmPasswordRegister}
                        onChange={e=>this.setState({confirmPasswordRegister:e.target.value})}
                        required
                    />
                    <span id="footer">
                        <Link to="/login" >Faça login em vez disso</Link>
                        <button 
                            type="submit" 
                            loading={requesting?"disabled":""}
                            disabled={requesting?"disabled":""}
                        >
                            Cadastrar
                        </button>
                    </span>
                </form>
            </ContainerAuth>
        )
    }
}
