import React,{Component} from 'react'
import api from '../services/api'
import {Redirect } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator'
import ImgLoading from '../assets/img/loading2.gif'
import Imglogo from '../assets/img/logo-mycloud.png'
import Imguser from '../assets/img/user.jpg'
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            redirect:'',
            formLogin:true,
            formRegister:false,
            msgErroLogin:'',
            msgErroRegister:'',
            emailLogin:'',
            passwordLogin:'',
            nameRegister:'',
            emailRegister:'',
            passwordRegister:'',
            confirmPasswordRegister:'',
           

        }
        this.validator = new SimpleReactValidator({
            messages: {
                required:'Este campo deve ser preenchido',
                email: 'Este não é um email válido',
                alpha_space:'Este campo deve conter apenas letras e espaços',
                min:'Senha deve ter no mínimo 6 caractéres',
            },
            validators: {
              passowordEqual: {  // name the rule
                message: 'As senhas estão diferentes',
                rule: (val, params, validator) => {
                  return this.handlerPasswords()
                },
                messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
                required: true  // optional
              }
            }
        })
    }
    componentDidMount(){
        window.document.title = 'login'
    }

    login = async e => {
        e.preventDefault()
        this.setState({msgErroLogin:false})
        if (this.validator.allValid()) {
            const request = {
                email: this.state.emailLogin,
                password : this.state.passwordLogin
            }

            try{
                const response = await api.post('auth/authenticate',request)
                if(response.status===200){
                    localStorage.setItem('auth-token',response.data.token)
                    localStorage.setItem('user.name',response.data.user.name)
                    localStorage.setItem('user.email',response.data.user.email)
                    localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
                    localStorage.setItem('id.trash',response.data.user.folders[1]._id)
                    this.setState({
                        redirect : `/mycloud/${response.data.user.folders[0]._id}`,
                    })
                    //window.location.href = `/mycloud/${this.state.id}`
                }
            }
            catch(err){
                if(err.message === 'Network Error'){
                    this.setState({msgErroLogin:'Falha na conexão com a internet'})
                }
                else if(err.message === 'Request failed with status code 400'){
                    this.setState({msgErroLogin:'Email e/ou senha inválidas'})
                }
                else{
                    this.setState({msgErroLogin:'Erro no login'})
                }
                console.log(Object.getOwnPropertyDescriptors(err));
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    register = async e => {
        e.preventDefault()
        this.setState({msgErroRegister:''})
        if (this.validator.allValid()) {
            const request = {
                name:this.state.nameRegister,
                email: this.state.emailRegister,
                password: this.state.passwordRegister,
            }
            try{
                const response = await api.post('auth/register',request)
                console.log(response.data.token)
                if(response.status===200){
                    localStorage.setItem('auth-token',response.data.token)
                    localStorage.setItem('user.name',response.data.user.name)
                    localStorage.setItem('user.email',response.data.user.email)
                    localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
                    localStorage.setItem('id.trash',response.data.user.folders[1]._id)
                    this.setState({
                        redirect : `/mycloud/${response.data.user.folders[0]._id}`,
                    })
                }
            }
            catch(err){
                if(err.message === 'Network Error'){
                    this.setState({msgErroRegister:'Falha na conexão con a internet'})
                }
                else if(err.message === 'Request failed with status code 400'){
                    this.setState({msgErroRegister:'Já existe um usuário cadastrado com o email informado'})
                }
                else{
                    this.setState({msgErroRegister:'Erro no cadastro'})
                }
                console.log(Object.getOwnPropertyDescriptors(err));
            }
        } 
        else{
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    handlerPasswords = ()=>{
        return this.state.passwordRegister === this.state.confirmPasswordRegister

    }


    showRegister = e =>{
        this.setState({
            formLogin:false,
            formRegister:true
        })
        window.document.title = 'cadastro'

    }
    showLogin = e => {
        this.setState({
            formLogin:true,
            formRegister:false
        })
        window.document.title = 'login'
    }
    render(){
        const {redirect,formLogin,formRegister} = this.state
        const {emailLogin,passwordLogin,msgErroLogin,msgErroRegister} = this.state
        const {emailRegister,nameRegister,passwordRegister,confirmPasswordRegister} = this.state
        if(redirect){
            return <Redirect to={redirect} exact={true}/>
        }
        return(
            <div className="main-wrapper">
                <div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
                    <div className="auth-box bg-dark border-top border-secondary">

             {formLogin?<div id="loginform">
                            <div className="text-center p-t-20 p-b-20 box-img">
                                <span className="db"><img src={Imglogo} width='178px' alt="logo" /></span>
                            </div>
                            <form className="form-horizontal m-t-20" onSubmit={e=>this.login(e)}>
                                <div className="row p-b-30" id='divform'>
                                    <div className="col-12">
                                        {msgErroLogin?
                                            <div style={{color:'red'}} className='text-center'>
                                                {msgErroLogin}
                                            </div>
                                        :null}
                                        <div style={{color:'red'}}>
                                            {this.validator.message('email', emailLogin, 'required|email')}
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-email"></i></span>
                                            </div>
                                            <input onChange={e=>{ this.setState({emailLogin:e.target.value}) } } value={emailLogin} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>
                                        
                                        <div style={{color:'red'}}>
                                            {this.validator.message('password', passwordLogin, 'required|min:6')}
                                        </div>

                                        <div className="input-group mb-3"> 
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                            </div>
                                            <input onChange={e=> {this.setState({passwordLogin:e.target.value})} } value={passwordLogin} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-top border-secondary">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="p-t-20 divbuttons">
                                                <button className="btn btn-block btn-lg btn-info" >Fazer login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                            <div className="row border-top border-secondary">
                                <div className="col-12">
                                    <div className="p-t-20 divbuttons">
                                        <button className="btn btn-success float-right">Esqueceu sua senha?</button> 
                                        <button className="btn btn-success float-left" onClick={e=>this.showRegister(e)}>Cadastre-se</button>
                                    </div>
                                </div>
                            </div>
                        </div>:null}
                        
          {formRegister?<div id='registerform'>
                            <div className="text-center p-t-20 p-b-20 box-img">
                                <span className="db"><img src={Imglogo} alt="logo" /></span>
                            </div>
                    
                            <form className="form-horizontal m-t-20" onSubmit={e => this.register(e)}>
                                <div className="row p-b-30">

                                    <div className="col-12">
                                        {msgErroRegister?
                                            <div style={{color:'red'}} className='text-center'>
                                                {msgErroRegister}
                                            </div>
                                        :null}
                                        <div style={{color:'red'}}>
                                            {this.validator.message('name', nameRegister, 'required|alpha_space')}
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-user"></i></span>
                                            </div>
                                            <input onChange={e=> {this.setState({nameRegister:e.target.value}) }} value={nameRegister} type="text" className="form-control form-control-lg" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>

                                        <div style={{color:'red'}}>
                                            {this.validator.message('email', emailRegister, 'required|email')}
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-danger text-white" id="basic-addon1"><i className="ti-email"></i></span>
                                            </div>
                                            <input onChange={e => {this.setState({emailRegister:e.target.value}) }} value={emailRegister} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>
                                        <div key={1000} style={{color:'red'}}>
                                            {this.validator.message('password', passwordRegister, 'required|min:6')}
                                        </div>
                                        <div key={1008} className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                            </div>
                                            <input key={1004} onChange={e => {this.setState({passwordRegister:e.target.value})}} value={passwordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                        </div>
                                        <div key={1001} style={{color:'red'}}>
                                            {this.validator.message('password', confirmPasswordRegister, 'required|min:6|passowordEqual')}
                                        </div>
                                        <div key={1009} className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-info text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                            </div>
                                            <input key={1003} onChange={e => {this.setState({confirmPasswordRegister:e.target.value})}} value={confirmPasswordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Confirmação de senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-top border-secondary">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="p-t-20 divbuttons">
                                                <button className="btn btn-block btn-lg btn-info" >Fazer cadastro</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row border-top border-secondary">
                                <div className="col-12">
                                        <div className="p-t-20 divbuttons">
                                            <button className="btn btn-success float-right">Esqueceu sua senha?</button> 
                                            <button className="btn btn-success float-left" onClick={e=>this.showLogin(e)}>Login</button>
                                        </div>
                                </div>
                            </div>
                        </div>:null}
                    </div>
                </div>
            </div>

        )
    }
}
