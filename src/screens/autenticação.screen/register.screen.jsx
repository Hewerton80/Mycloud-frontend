import React,{Component} from 'react'
import api from '../../services/api'
import {Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator'
import TeplateAutenticacao from '../../components/templates/autenticação.template'
import FormRegister from './components/forms/formRegister'
import ImgLoading from '../../assets/img/loading2.gif'
import Imglogo from '../../assets/img/logo-mycloud.png'

import Imguser from '../../assets/img/user.jpg'

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
        window.document.title = 'register'
    }

    register = async e => {
        e.preventDefault()
        this.setState({msgErroRegister:''})
        if (this.validator.fieldValid('nameRegister') && this.validator.fieldValid('emailRegister') && this.validator.fieldValid('passwordRegister') && this.validator.fieldValid('confirmPasswordRegister')) {
            const request = {
                name:this.state.nameRegister,
                email: this.state.emailRegister,
                password: this.state.passwordRegister,
            }
            try{
                this.setState({requesting:true})
                const response = await api.post('auth/register',request)
                //console.log(response.data.token)
                if(response.status===200){
                    localStorage.setItem('auth-token',response.data.token)
                    localStorage.setItem('user.name',response.data.user.name)
                    localStorage.setItem('user.email',response.data.user.email)
                    localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
                    localStorage.setItem('id.trash',response.data.user.folders[1]._id)
                    this.props.history.push(`/mycloud/${response.data.user.folders[0]._id}`)
                }
            }
            catch(err){
                this.setState({requesting:false})
                if(err.message === 'Network Error'){
                    this.setState({msgErroRegister:'Falha na conexão com o servidor'})
                }
                else if(err.message === 'Request failed with status code 400'){
                    this.setState({msgErroRegister:'Já existe um usuário cadastrado com o email informado'})
                }
                else{
                    this.setState({msgErroRegister:'Erro no cadastro'})
                }
                //console.log(Object.getOwnPropertyDescriptors(err));
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
    render(){
        const {formRegister} = this.state
        const {msgErroRegister,requesting} = this.state
        const {emailRegister,nameRegister,passwordRegister,confirmPasswordRegister} = this.state
        return(
            <TeplateAutenticacao>
              <div id='registerform'>
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
                                            {this.validator.message('nameRegister', nameRegister, 'required|alpha_space')}
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-user"></i></span>
                                            </div>
                                            <input onChange={e=> {this.setState({nameRegister:e.target.value}) }} value={nameRegister} type="text" className="form-control form-control-lg" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>

                                        <div style={{color:'red'}}>
                                            {this.validator.message('emailRegister', emailRegister, 'required|email')}
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-danger text-white" id="basic-addon1"><i className="ti-email"></i></span>
                                            </div>
                                            <input onChange={e => {this.setState({emailRegister:e.target.value}) }} value={emailRegister} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
                                        </div>
                                        <div  style={{color:'red'}}>
                                            {this.validator.message('passwordRegister', passwordRegister, 'required|min:6')}
                                        </div>
                                        <div  className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                            </div>
                                            <input key={1004} onChange={e => {this.setState({passwordRegister:e.target.value})}} value={passwordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                        </div>
                                        <div  style={{color:'red'}}>
                                            {this.validator.message('confirmPasswordRegister', confirmPasswordRegister, 'required|min:6|passowordEqual')}
                                        </div>
                                        <div  className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-info text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                            </div>
                                            <input  onChange={e => {this.setState({confirmPasswordRegister:e.target.value})}} value={confirmPasswordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Confirmação de senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row border-top border-secondary">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="p-t-20 divbuttons">
                                                {requesting?
                                                <button className="btn btn-block btn-lg btn-info" >
                                                    <img src={ImgLoading} width='20px'/>
                                                </button>:
                                                <button className="btn btn-block btn-lg btn-info" >
                                                    Fazer cadastro
                                                </button>}                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row border-top border-secondary">
                                <div className="col-12">
                                    <Link to={'/login'} >
                                        <div className="p-t-20 divbuttons">
                                            <button className="btn btn-success float-left" onClick={e=>this.showLogin(e)}>Login</button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
            </TeplateAutenticacao>

        )
    }
}
