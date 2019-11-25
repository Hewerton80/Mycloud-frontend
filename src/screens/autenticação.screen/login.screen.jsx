import React,{Component} from 'react'
import api from '../../services/api'
import {Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator'
import TeplateAutenticacao from '../../components/templates/autenticação.template'
import ImgLoading from '../../assets/img/loading2.gif'
import Imglogo from '../../assets/img/logo-mycloud.png'
import Imguser from '../../assets/img/user.jpg'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            msgErroLogin:'',
            emailLogin:'',
            passwordLogin:'',
            requesting:false,

        }
        this.login = this.login.bind(this)
        this.handlerEmail = this.handlerEmail.bind(this)
        this.handlerPassword = this.handlerPassword.bind(this)
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

    async login(e){
        e.preventDefault()
            const request = {
                email: this.state.emailLogin,
                password : this.state.passwordLogin
            }
            try{
                this.setState({requesting:true})
                const response = await api.post('auth/authenticate',request)
                this.setState({requesting:false})
                if(response.status===200){
                    localStorage.setItem('auth-token',response.data.token)
                    localStorage.setItem('user.name',response.data.user.name)
                    localStorage.setItem('user.email',response.data.user.email)
                    localStorage.setItem('id.mycloud',response.data.user.folders[0]._id)
                    localStorage.setItem('id.trash',response.data.user.folders[1]._id)
                    this.props.history.push(`/mycloud/${response.data.user.folders[0]._id}`)
                    /*this.setState({
                        redirect : `/mycloud/${response.data.user.folders[0]._id}`,

                    })*/
                    //window.location.href = `/mycloud/${this.state.id}`
                }
            }
            catch(err){
                this.setState({requesting:false})
                if(err.message === 'Network Error'){
                    this.setState({msgErroLogin:'Falha na conexão com o servidor'})
                }
                else if(err.message === 'Request failed with status code 400'){
                    this.setState({msgErroLogin:'Email e/ou senha inválidas'})
                }
                else{
                    this.setState({msgErroLogin:'Erro no login'})
                }
                //console.log(Object.getOwnPropertyDescriptors(err));
            }

    }
    handlerEmail(e){
        this.setState({emailLogin:e.target.value})
    }
    handlerPassword(e){
        this.setState({passwordLogin:e.target.value})
    }
    render(){
        const {msgErroLogin,requesting, emailLogin ,passwordLogin} = this.state
        return(
            <TeplateAutenticacao>
                <div id="loginform">
                    <div className="text-center p-t-20 p-b-20 box-img">
                        <span className="db"><img src={Imglogo} width='178px' alt="logo" /></span>
                    </div>
                    <form className="form-horizontal m-t-20" onSubmit={e=> this.login(e)}>
                        <div className="row p-b-30" id='divform'>
                            <div className="col-12">
                                <div style={{color:'red'}} className='text-center'>
                                    {msgErroLogin || ''}
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-email"></i></span>
                                    </div>
                                    <input onChange={e=> this.handlerEmail(e) } value={emailLogin} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
                                </div>


                                <div className="input-group mb-3"> 
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                    </div>
                                    <input onChange={e=> this.handlerPassword(e) } value={passwordLogin} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row border-top border-secondary">
                            <div className="col-12">
                                <div className="form-group">
                                    <div className="p-t-20 divbuttons">
                                        {requesting?
                                        <button className="btn btn-block btn-lg btn-info" disabled>
                                            <img src={ImgLoading} width='20px'/>
                                        </button>:
                                        <button type='submit' className="btn btn-block btn-lg btn-info" >
                                            Fazer login
                                        </button>}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                    <div className="row border-top border-secondary">
                        <div className="col-12">
                            <div className="p-t-20 divbuttons">
                                <Link to={'/register'} >
                                   <button className="btn btn-success float-left"> 
                                     Cadastre-se
                                   </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </TeplateAutenticacao>

        )
    }
}
