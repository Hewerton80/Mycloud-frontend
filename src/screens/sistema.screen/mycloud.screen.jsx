import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import Swal from 'sweetalert2'
import Snackbar from '@material-ui/core/Snackbar'
import FoldersAndFiles from '../../components/divFoldersAndFiles'
import ImgLoading from '../../assets/img/loading2.gif'
import Imglogo from '../../assets/img/logo-mycloud.png'
import Imguser from '../../assets/img/user.jpg'
//import socket from 'socket.io-client'
import { Redirect } from "react-router-dom";
export default class Mycloud extends Component{

	constructor(props){
		super(props)
		this.state={
			RedirectToToMycloud:false,
			fileSelected:'',
			idFolder: '',
			pathList:'',
			folders: [],
			files:[],
			showSnackBar:false,
			msgSnackBar:'',
			erroConectionInternet:false,
			loadingDashboard:false,
			redirect:'',
			inputOpenFileRef : React.createRef()
		}
	}
	async componentWillMount(){
		if(!localStorage.getItem('auth-token')){
			this.props.history.push('/')
		}
	}
	async componentDidMount(){ 
		console.log('didMount');
		window.document.title ='mycloud'
		this.updateDashBoard()
	}
	async updateDashBoard(id = localStorage.getItem('id.mycloud')){
		try{
			this.setState({loadingDashboard:true})
			const response = await api.get(`mycloud/${id}`)
			console.log('update dashboard:');
			console.log(response.data)
			if(response.status===200){
				this.setState({
					idFolder 			  : response.data._id,
					folders  			  : response.data.folders,
					pathList 			  : response.data.pathList,
					files    			  : response.data.files,
					loadingDashboard      : false,
					erroConectionInternet : false	
				})
			}
		}
		catch(err){
			this.handlerErro(err)
		}		
	}
	handlerErro = async err => {
		//console.log(err.message);
		this.setState({loadingDashboard:false})
		if(err.message==='Network Error'){
			this.setState({erroConectionInternet:true})
		}
		else if(err.message==='Request failed with status code 421'){
			this.setState({redirect:'/erro404'})
		}
		else if(err.message==='Request failed with status code 404'){
			this.setState({redirect:'/erro404'})
			//window.location.href = '/erro404'
		}
		else{
			this.setState({
				showSnackBar:true,
				msgSnackBar:'Erro na operação. Recarregue a página',
			})
		}
	}
	openFolder = async (e,_id) => {
		const id = typeof _id ==='object'?_id.id:_id
		this.props.history.push(`/mycloud/${id}`)
		this.updateDashBoard(id)
		
	}
	criaPasta = async e => {
		try{
			const {value} = await Swal.fire({
				title:'Nome da pasta',
				input:'text',
				confirmButtonText:'Criar',
				cancelButtonText:'Cancelar',
				showCancelButton: true,
				inputValue:'',//valor inicial
				inputValidator:(value)=>{
					if(!value){
						return 'Voçê precisa escrever algo!'
					}
					else if(value.indexOf('/') > -1 || value.indexOf('\\') > -1 || value.indexOf(':') > -1 || value.indexOf('*')  > -1 || value.indexOf('?') > -1 || value.indexOf('"') > -1 || value.indexOf(`'`) > -1 || value.indexOf('<') > -1 || value.indexOf('>') > -1 || value.indexOf('|') > -1 || value.indexOf(' -- ') > -1){
						return `Os nomes de arquivo/pasta não podem conter nenhum dos seguintes caracteres:\n /  \\  :  *  ?  "  '  <  >  |  --`
					}
				}
			})
			if(value){
				const request = {
					title: value
				}
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'Criando pasta'
				})
				Swal.showLoading()
				const response = await api.post(`mycloud/${this.state.idFolder}/store/folder`,request)
				if(response.status===200){

					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer: 3000
					});
					Toast.fire({
						type: 'success',
						title: 'Pasta criada com sucesso'
					})
					/*const io = socket('http://localhost:3001')
					io.emit('connectRoom',this.state.idFolder)
					io.on('folder',data=>{
						//console.log(data)
					})*/
					this.updateDashBoard(response.data._id)
				}
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	async renameFolder(e,id,name){
		try{
			const {value} = await Swal.fire({
				title:'Nome da pasta',
				input:'text',
				confirmButtonText:'Renomear',
				cancelButtonText:'Cancelar',
				showCancelButton: true,
				inputValue : name,//valor inicial
				inputValidator:(value)=>{
					if(!value){
						return 'Voçê precisa escrever algo!'
					}
					else if(value.indexOf('/') > -1 || value.indexOf('\\') > -1 || value.indexOf(':') > -1 || value.indexOf('*')  > -1 || value.indexOf('?') > -1 || value.indexOf('"') > -1 || value.indexOf(`'`) > -1 || value.indexOf('<') > -1 || value.indexOf('>') > -1 || value.indexOf('|') > -1 || value.indexOf(' -- ') > -1){
						return `Os nomes de arquivo/pasta não podem conter nenhum dos seguintes caracteres:\n /  \\  :  *  ?  "  '  <  >  |  --`
					}				
				}
			})
			if(value){
				const request = {
					title : value
				}
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'Renomeando'
				})
				Swal.showLoading()
				const response = await api.put(`mycloud/update/folder/${id}`,request)
				//console.log(response.data) 
				if(response.status===200){
					//console.log('deu certo renomear')
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer:3000
					});
					Toast.fire({
						type: 'success',
						title: 'Pasta renomeada com sucesso'
					})
					await this.updateDashBoard(response.data._id)
				}else{
					Swal.fire({
						type: 'error',
						title: 'Oops...',
						text: 'Pasta não pôde ser renomeada!',
					})	
				}
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	downloadFolder = async (e,id,idFolderFather) =>{
		try{
			//console.log(idFolderFather);
			if(!this.state.showSnackBar){
				this.setState({
					msgSnackBar :`compactando pasta: 0.00 %`,
					showSnackBar:true
				})
				let reponseData = await api.get(`mycloud/folder/${idFolderFather}`)
				let sizeInitial = reponseData.data.size
			
				let reponseDataa = await api.get(`mycloud/folder/${id}`)
				let sizeFile = reponseDataa.data.size
				sizeInitial = sizeInitial - reponseDataa.data.size
				//console.log('inicial: '+sizeInitial);
				const showInfo = setInterval( async function(){
					
					let reponseInterval = await api.get(`mycloud/folder/${idFolderFather}`)
					//console.log(reponseInterval.data.size);
					
					let percentual = ((reponseInterval.data.size-sizeInitial)/sizeFile*100).toFixed(2)
					
					this.setState({msgSnackBar:`compactando pasta: ${percentual} %`})
					
				}.bind(this), 1000);

				const response = await api.get(`mycloud/zip/folder/${id}`)
				clearInterval(showInfo);
				this.setState({
					showSnackBar:false,
					msgSnackBar:''
				})
			
				if(response.status === 200){

					const {url} = response.data
					window.open(url,'_self')
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer: 3000
					});
					Toast.fire({
						type: 'success',
						title: 'Download pronto'
					})
				}
			}
			else{
				Swal.fire({
					type: 'error',
					text: 'Já há uma atividade em progresso',
					showConfirmButton: false,
					showCloseButton: true,
				})
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	removeFolder = async (e,id)=>{
		const {value} = await Swal.fire({
			title: 'Tem certeza que quer mover essa pasta para lixeira?',
			//text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, mover para lixeira'
		})
		if (value) {
			try{
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'Movendo para lixeira'
				})
				Swal.showLoading()
				const response = await api.put(`/mycloud/delete/folder/${id}`)
				//console.log(response)
				if(response.status===200){
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer: 3000
					});
					Toast.fire({
						type: 'success',
						title: 'Pasta movida para lixeira com sucesso'
					})
					this.updateDashBoard(response.data._id)
				}
			}
			catch(err){
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'Pasta não pôde ser movida para lixeira!',
				})
				this.handlerErro(err)		
			}	
		}
	}
	getInfoFolder = async (e,id) => {
		try{
			const response = await api.get(`mycloud/folder/${id}`)
			//console.log(response.data)
			
			if(response.status===200){
				const folder = response.data.folder
				const size = response.data.size
				folder.createdAt = new Date(folder.createdAt)
				folder.updatedAt = new Date(folder.updatedAt)
				//console.log(folder.createdAt)
				const dia = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quita-feira','Sexta-feira','Sábado']
				const mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
				let createdAt = folder.createdAt
				createdAt = `${dia[createdAt.getDay()]}, ${createdAt.getDate()} de ${mes[createdAt.getMonth()]} de ${createdAt.getFullYear()}, ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`
				let updatedAt = folder.updatedAt
				updatedAt = `${dia[updatedAt.getDay()]}, ${updatedAt.getDate()} de ${mes[updatedAt.getMonth()]} de ${updatedAt.getFullYear()}, ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`
				
				Swal.fire({
					html:`
						<div style="text-align: left">
						<p><b>Nome : </b>${folder.title}</p>
						<p><b>Tamanho : </b>${size} MB</p>
						<p><b>Tem : </b>${folder.folders.length} pastas e ${folder.files.length} arquivos</p>
						<p><b>Criado em : </b>${createdAt}</p>
						<p><b>Última modificação : </b>${updatedAt}</p>
						</div>
						`,
					showConfirmButton: false,
					showCloseButton: true,
				})
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	uploadFile = async (e,idFolderFhader) => {
		try{
			if(!this.state.showSnackBar){
				const file = e.target.files[0]
				//console.log(file);
				const sizeFile = (file.size/1024/1024).toFixed(2)
				//console.log(sizeFile);
				const data = new FormData()
				data.append('file',file)
				if (file) {
					let reponseData = await api.get(`mycloud/folder/${this.state.idFolder}`)
					const sizeInitial = reponseData.data.size
					//console.log('tamnho inicial: '+ sizeInitial);
					this.setState({
						msgSnackBar :`${file.name} - 0.00 %`,
						showSnackBar:true
					})
					const showInfo = setInterval( async function(){ 
						let reponseInterval = await api.get(`mycloud/folder/${idFolderFhader}`)
						let sizeFolder = ((reponseInterval.data.size-sizeInitial)/sizeFile*100).toFixed(2)
						sizeFolder = sizeFolder > 100 ? 100.00:sizeFolder
						this.setState({
							msgSnackBar :`Fazendo upload de ${file.name} - ${sizeFolder} %`,
						})
						//console.log(sizeFolder);
					}.bind(this), 1000);
					const response = await api.post(`/mycloud/${idFolderFhader}/store/file`,data)
					clearInterval(showInfo);
					await this.setState({
						showSnackBar:false,
						msgSnackBar:'',
					})
					if(response.status === 200){
						this.setState({erroConectionInternet:false})
						const Toast = Swal.mixin({
							toast: true,
							position: 'bottom-start',
							showConfirmButton: false,
							timer: 3000
						});
						Toast.fire({
							type: 'success',
							title: 'arquivo criado'
						})
						this.updateDashBoard(response.data._id)

				  	}
				}
			}
			else{
				Swal.fire({
					type: 'error',
					text: 'Já há uma atividade em progresso',
					showConfirmButton: false,
					showCloseButton: true,
				})
			}
		}
		catch(err){
			this.handlerErro(err)
		}

	}

	openFile = async (e,id) =>{
		try{
			const response = await api.get(`mycloud/file/${id}`)
			//console.log(response);
			if(response.status ===200){
				const file = response.data
				const [type, ext]= file.mimetype.split('/')
				if(type === 'image'){
					Swal.fire({
						title: file.title,
						imageUrl: `${file.url}`,
						showConfirmButton: false,
						showCloseButton: true,
						imageAlt:`<a href='${file.url}' target='blank_'> ${file.title}</a>`
					})
				}

				else if(ext==='mp4' || ext==='mp3'){
					Swal.fire({
						//text: file.title,
						html:
						`
						<p>${file.title}</p>
						<video controls="" autoplay="" name="media" style="margin:auto; max-width: 100%" >
						<source src="${file.url}"></video>
						`,
						showConfirmButton: false,
						showCloseButton: true,
					})
				
				}else{
					window.open(file.url)
				}

			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	renameFile = async(e,id,name) => {
		try{
			const {value} = await Swal.fire({
				title:'Nome do arquivo',
				html:`
					<i style="color:rgb(255,0,0)" class="fas fa-exclamation-circle"></i> 
					Se modificar a extensão, o arquivo sofrerá alterações em sua leitura!
					`,
				input:'text',
				confirmButtonText:'Renomear',
				cancelButtonText:'Cancelar',
				showCancelButton: true,
				inputValue : name,//valor inicial
				inputValidator:(value)=>{
					if(!value){
						return 'Voçê precisa escrever algo!'
					}
					else if(value.indexOf('/') > -1 || value.indexOf('\\') > -1 || value.indexOf(':') > -1 || value.indexOf('*')  > -1 || value.indexOf('?') > -1 || value.indexOf('"') > -1 || value.indexOf(`'`) > -1 || value.indexOf('<') > -1 || value.indexOf('>') > -1 || value.indexOf('|') > -1 || value.indexOf(' -- ') > -1){
						return `Os nomes de arquivo/pasta não podem conter nenhum dos seguintes caracteres:\n /  \\  :  *  ?  "  '  <  >  |  --`
					}
				}
			})
			if(value){
				const request = {
					title : value
				}
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'Renomeando'
				})
				Swal.showLoading()
				const response = await api.put(`mycloud/update/file/${id}`,request)
				//console.log(response.data) 
				if(response.status===200){
					//console.log('deu certo renomear')
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer:3000
					});
					Toast.fire({
						type: 'success',
						title: 'Arquivo renomeado com sucesso'
					})
					this.updateDashBoard(response.data._id)
				}else{
					Swal.fire({
						type: 'error',
						title: 'Oops...',
						text: 'Pasta não pôde ser renomeada!',
					})	
				}
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	downloadFile = async (e,file_url,file_name) =>{
		try{
			const Toast = Swal.mixin({
				toast: true,
				position: 'bottom-start',
				showConfirmButton: false,
				
			});
			Toast.fire({
				title: 'Preparando arquivo para download'
			})
			Swal.showLoading()
			//window.open(file_url,'_self')
			const response = await api.get(file_url,{responseType: 'blob'})
			//console.log(response.data)
			if(response.status===200){
				//console.log('deu certo o download')
				//----
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', file_name);
				document.body.appendChild(link);
				link.click();
				//----
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer:3000
				});
				Toast.fire({
					type: 'success',
					title: 'Download pronto'
				})
			}else{
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'Falha no  download!',
				})	
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	removeFile = async (e,id) => {
		const {value} = await Swal.fire({
			title: 'Tem certeza que quer mover esse arquivo para lixeira?',
			//text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, mover para lixeira'
		})
		if (value) {
			try{
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'Movendo para lixeira'
				})
				Swal.showLoading()
				const response = await api.put(`/mycloud/delete/file/${id}`)
				//console.log(response)
				if(response.status===200){
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer: 3000
					});
					Toast.fire({
						type: 'success',
						title: 'Arquivo movida para lixeira com sucesso'
					})
					this.updateDashBoard(this.state.idFolder)
				}
			}
			catch(err){
				this.handlerErro(err)
			}
		}
	}
	getInfoFile = async (e,id) =>{
		try{
			const response = await api.get(`mycloud/file/${id}`)
			//console.log(response.data)
			
			if(response.status===200){
				const file = response.data
				file.createdAt = new Date(file.createdAt)
				file.updatedAt = new Date(file.updatedAt)
				//console.log(file.createdAt)
				const dia = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quita-feira','Sexta-feira','Sábado']
				const mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
				let createdAt = file.createdAt
				createdAt = `${dia[createdAt.getDay()]}, ${createdAt.getDate()} de ${mes[createdAt.getMonth()]} de ${createdAt.getFullYear()}, ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`
				let updatedAt = file.updatedAt
				updatedAt = `${dia[updatedAt.getDay()]}, ${updatedAt.getDate()} de ${mes[updatedAt.getMonth()]} de ${updatedAt.getFullYear()}, ${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`
				
				Swal.fire({
					html:`
						<div style="text-align: left">
						<p><b>Nome : </b><a href='${file.url}' target='blank_'> ${file.title}</a></p>
						<p><b>Tamanho : </b>${file.size} MB</p>
						<p><b>Criado em : </b>${createdAt}</p>
						<p><b>Última modificação : </b>${updatedAt}</p>
						<div/>
						`,
					showConfirmButton: false,
					showCloseButton: true,
				})
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	logout = e=>{
		try{
			e.preventDefault()
			localStorage.removeItem('auth-token')
			if(!localStorage.getItem('auth-token')){
				this.setState({redirect:'/'})
			}
		}
		catch(err){
			this.handlerErro(err)
		}

	}
	/*setHistory = e =>{
		//console.log('evento history');
		e.preventDefault()
		//console.log(e)
		this.updateDashBoard(this.props.match.params.id)
	}*/
	render(){

		//window.addEventListener("popstate", this.setHistory);
		if(this.state.redirect){
			return <Redirect to={this.state.redirect} exact={true}/>
		}
		let {folders,files,pathList,erroConectionInternet,loadingDashboard} = this.state;
		let {inputOpenFileRef,msgSnackBar,showSnackBar,idFolder} = this.state
		pathList = pathList.split(' >> ')

		return(
		<React.Fragment>

			<div id="main-wrapper"> 	
{/*---------------------------------NavBar--------------------------------------*/}
			    <header  className="topbar" data-navbarbg="skin5">
			        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
		                <div  className="navbar-header" data-logobg="skin5">
		                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" style={{color:'#1F262D0'}}><i className="ti-menu ti-close"></i></a>
		                    
		                    <div className="navbar-brand">
		                        <b className="logo-icon p-l-10">
	                            	<h1><i className="fab fa-cloudversify"></i></h1>
		                        </b>
		                        <span className="logo-text">
		                            <img src={Imglogo} alt="homepage" className="light-logo" />   
		                        </span>
		                    </div>
		                    <a  className="topbartoggler d-block d-md-none waves-effect waves-light" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more"></i></a>
		                </div>
		             	<div  className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
		             		<ul  className="navbar-nav float-left mr-auto">
		                        <li className="nav-item d-none d-md-block"><a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar"><i className="mdi mdi-menu font-24"></i></a></li>
		                        <li className="nav-item dropdown">
		                            <div className="nav-link dropdown-toggle"  id="navbarDropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}>
		                            	<span className="d-none d-md-block"><i className="fas fa-plus"></i> Novo <i className="fa fa-angle-down"></i></span>
		                            	<span  className="d-block d-md-none"><i className="fa fa-plus"></i></span>   
		                            </div>
		                            <div  className="dropdown-menu" aria-labelledby="navbarDropdown">
		                                <button className="dropdown-item" onClick={e => this.criaPasta(e)}><i className="fas fa-folder-plus"></i> Nova pasta</button>
		                                <button  className="dropdown-item" onClick={e => {inputOpenFileRef.current.click()}}><i className="fas fa-upload"></i> Upload de arquivo</button>
		                            	<input   type='file' ref={inputOpenFileRef} onChange={e => this.uploadFile(e,idFolder)} style={{display: "none"}}/>
		                            </div>
		                        </li>
		                        <li className="nav-item search-box"> 
		                        	<a className="nav-link waves-effect waves-dark">
		                        		<i className="ti-search"></i>
		                        	</a>
		                            <form className="app-search position-absolute">
		                                <input type="text" className="form-control" placeholder="Search &amp; enter"/> <a className="srh-btn"><i className="ti-close"></i></a>
		                            </form>
		                        </li>
		             		</ul>

		             		<ul className="navbar-nav float-right">
		                        <li className="nav-item dropdown">
		                            <a  className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={Imguser} alt="user" className="rounded-circle" width="31"/></a>
		                            <div  className="dropdown-menu dropdown-menu-right user-dd animated">
		                            	<p className="dropdown-item"><i className="ti-user m-r-5 m-l-5"></i> {localStorage.getItem('user.name')}</p>
		                                <a className="dropdown-item" onClick={e=> this.logout(e)}><i className="fa fa-power-off m-r-5 m-l-5"></i> Logout</a>
		                            </div>
		                        </li>
		             		</ul>
		             	</div>
			        </nav>
			    </header>
{/*--------------------------------	-Final-NavBar--------------------------------------*/}



{/*-------------------------------------SideBarr---------------------------------------*/}
				<aside className="left-sidebar" data-sidebarbg="skin5">
					<div className="scroll-sidebar">
						<nav className="sidebar-nav">
							<ul id="sidebarnav" className="p-t-30">
	                    		<li className="sidebar-item selected"> 
		                    		<Link push to={`/mycloud/${localStorage.getItem('id.mycloud')}`} onClick={()=> this.updateDashBoard(localStorage.getItem('id.mycloud'))} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
		                    			<i className="fas fa-cloud" />
		                    			<span className="hide-menu">
		                    				Início
		                    			</span>
		                    		</Link>
	                    		</li>
	                    		<li className="sidebar-item"> 
		                    		<Link push to={`/lixeira/${localStorage.getItem('id.trash')}`} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
			                    		<i className="fas fa-trash"/>
			                    		<span className="hide-menu">
			                    			Lixeira
			                    		</span>
		                    		</Link>
	                    		</li>
							</ul>
						</nav>
					</div>
				</aside>
{/*-----------------------------------Final-SideBar------------------------------------*/}


{/*------------------------------------DashBoard---------------------------------------*/}
				<div  className="page-wrapper">
					<div  className="page-breadcrumb">
	                	<div className="row">
	                    	<div className="col-12 d-flex no-block align-items-center">
	                        	<div className=" text-left">
	                            	<nav aria-label="breadcrumb">
	                                	<ol className="breadcrumb">
	                                		{pathList.map((path,i)=>{
	                                			let [nome,id] = path.split(' -- ')
	                                    		return(
	                                    			<li key={i} className="breadcrumb-item" >
	                                    				<Link push to={`/mycloud/${id}`} onClick={ ()=> this.updateDashBoard(id) }>
	                                    					{i===0?'Início':nome}
	                                    				</Link>
	                                    			</li>
	                                    		)                             	
	                                		})}
	                                	</ol>
	                            	</nav>
	                        	</div>
	                    	</div>
	                	</div>
	            	</div>
	            	{loadingDashboard?
	            	<div  className='text-center'><img src={ImgLoading}/></div>:

					<div  className="container-fluid">
	                	<div  className="row">
	                		<FoldersAndFiles
	                			idFolder={idFolder}
	                			folders={folders}
	                			openFolder={this.openFolder}
	                			renameFolder={this.renameFolder}
	                			downloadFolder={this.downloadFolder}
	                			removeFolder={this.removeFolder}
	                			getInfoFolder={this.getInfoFolder}
	                			files={files}
	                			openFile={this.openFile}
	                			renameFile={this.renameFile}
	                			removeFile={this.removeFile}
	                			downloadFile={this.downloadFile}
	                			getInfoFile={this.getInfoFile}
	                		/>
	                    </div>
					</div>}
   					<footer className="footer text-center">
		        		Designed and Developed by <a href="https://wrappixel.com" target='_blank'>WrapPixel</a>.
		    		</footer>
				</div>

{/*-----------------------------------Final-DashBoard------------------------------------*/}
			</div>

			<Snackbar key={1001}
					    anchorOrigin={{
					    	vertical: 'bottom',
					    	horizontal: 'left',
					    }}
						open={showSnackBar}
					
						ContentProps={{
						'aria-describedby': 'message-id',
						}}
						message={<span>{msgSnackBar}</span>}
			/>
			<Snackbar key={1004}
					    anchorOrigin={{
					    	vertical: 'bottom',
					    	horizontal: 'left',
					    }}
						open={erroConectionInternet}
					
						ContentProps={{
						'aria-describedby': 'message-id',
						}}
						message={<span>Falha na conexão com o servidor</span>}
			/>
		</React.Fragment>

		)
	}
}



