import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import Swal from 'sweetalert2'
import {Snackbar,CircularProgress} from '@material-ui/core'
import {SideBar,SideBarBrand,SideBarNav,SideBarItem} from "../../components/SideBar/styled"
import {AppBar,AppBarBrand,AppBarSeache,AppBarProfile} from "../../components/AppBar/styled"
import {Folder,FolderHead,FolderOptions} from "../../components/Folder/styled"
import {FaCloud,FaTrash,FaSearch,FaPowerOff,FaChevronRight,FaFolderPlus,FaUpload,FaFolder,FaPlus,FaEllipsisV,FaFolderOpen,FaEdit,FaFileArchive,FaTrashAlt,FaInfoCircle} from "react-icons/fa"
import {DropDown,DropDownContent,DropDownToogle} from "../../components/DropDown"
import {Container,DashBoard} from "../../components/Containers/styled"
import {NavLink} from "../../components/NavLink/styled"
import {Row,Col} from "../../components/Grid/styled"
import ImgLoading from '../../assets/img/loading2.gif'
import Imguser from '../../assets/img/user.jpg'
import driveLogo from '../../assets/img/google-drive.png'
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

{/*---------------------------------NavBar--------------------------------------*/}
			<AppBar>
				<AppBarBrand>
					<img src={driveLogo} alt="homepage"/> 
					<span>Drive</span>
				</AppBarBrand>
				<AppBarSeache>
					<FaSearch/>
					<input 
						type="text"
						placeholder="Pesquise no Drive"
					/>
				</AppBarSeache>
				<AppBarProfile>
					<DropDown>
						<DropDownToogle htmlFor="dlogout" id="dropDownUser">
							<img src={Imguser} alt={localStorage.getItem('user.name')}/>
						</DropDownToogle>
						<DropDownContent translate={"-300px,0px"} id="dlogout">
							<div className="info-user">
								<h6>{localStorage.getItem('user.name')}</h6>
								<p id="email">{localStorage.getItem('user.email')}</p>
								<p id="logout" onClick={e=> this.logout(e)}><FaPowerOff/> Fazer Logout</p>
							</div>
						</DropDownContent>
					</DropDown>
				</AppBarProfile>
					{/* <div  className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
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
					</div> */}
				</AppBar>
{/*--------------------------------	-Final-NavBar--------------------------------------*/}



{/*-------------------------------------SideBarr---------------------------------------*/}
				<Container>
					<SideBar>
						<SideBarBrand>
							<DropDown>
								<DropDownToogle htmlFor="new" id="idToogle">
									<button id="button-new"><FaPlus/> Novo</button>
								</DropDownToogle>
								<DropDownContent id="new">
									<ul>
										<li><FaFolderPlus/><p  onClick={e => this.criaPasta(e)}> Nova pasta</p></li>
										<li><FaUpload/> <p  onClick={e => {inputOpenFileRef.current.click()}}>Upload de arquivo</p></li>
										<input  type='file' ref={inputOpenFileRef} onChange={e => this.uploadFile(e,idFolder)} />
									</ul>
								</DropDownContent>
							</DropDown>
						</SideBarBrand>
						<SideBarNav>
							<SideBarItem active> 
								<Link push to={`/mycloud/${localStorage.getItem('id.mycloud')}`} onClick={()=> this.updateDashBoard(localStorage.getItem('id.mycloud'))} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
									<FaCloud/>
									<span className="hide-menu">
										Início
									</span>
								</Link>
							</SideBarItem>
							<SideBarItem className="sidebar-item"> 
								<Link push to={`/lixeira/${localStorage.getItem('id.trash')}`} className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false">
									<FaTrash/>
									<span className="hide-menu">
										Lixeira
									</span>
								</Link>
							</SideBarItem>
						</SideBarNav>
					</SideBar>
{/*-----------------------------------Final-SideBar------------------------------------*/}


{/*------------------------------------DashBoard---------------------------------------*/}
					<DashBoard>
						<Row>
							<NavLink>
								{pathList.map((path,i)=>{
									let [nome,id] = path.split(' -- ')
									return(
										<>
										{i!==0 && <FaChevronRight/>}
										<span key={i} className="breadcrumb-item" >
											<Link push to={`/mycloud/${id}`} onClick={ ()=> this.updateDashBoard(id) }>
												{i===0?'Início':nome}
											</Link>
										</span>
										</>
									)                             	
								})}
							</NavLink>
						</Row>
					{loadingDashboard?
					<div  style={{
						marginTop:"60px",
						justifyContent: "center",
    					display: "flex"
					}}>
						<CircularProgress/>
					</div>
					:

						<>
						<Row>
							<Col xs={12} >
								<p style={{margin:"7px"}}>Pastas</p>
							</Col>
						</Row>
						<Row>
							{folders.map((folder,i)=>
								<Col xs={12} sm={4} md={3} lg={3}>
									<Folder key={folder._id.toString()} onDoubleClick={e => this.openFolder(e,folder._id)}>
										<FolderHead>
											<FaFolder/>
											<p id="foderName">{folder.title}</p>
										</FolderHead>
										<FolderOptions>
											<DropDown>
												<DropDownToogle htmlFor={"folder"+i} id={"folderToogle"+i}>
													<span><FaEllipsisV/></span>
												</DropDownToogle>
												<DropDownContent id={"folder"+i} translate="-124px,0px">
													<ul>
														<li><p  onClick={e => this.openFolder(e,folder._id)}><FaFolderOpen/>  Abrir</p></li>
														<li><p  onClick={e => this.renameFolder(e,folder._id,folder.title)}><FaEdit/>  Renomear</p></li>
														<li><p  onClick={e => this.downloadFolder(e,folder._id,idFolder)}><FaFileArchive/>  Baixar como zip</p></li>
														<li><p  onClick={e => this.removeFolder(e,folder._id)}><FaTrashAlt/>  Remover</p>  </li>
														<li><p  onClick={e => this.getInfoFolder(e,folder._id)}><FaInfoCircle/> Ver detalhes</p>	</li>
													</ul>
												</DropDownContent>
											</DropDown>
										</FolderOptions>
									</Folder>
								</Col>
							)}
						</Row>
						<Row>
							<Col xs={12} >
								<p style={{margin:"7px"}}>Arquivos</p>
							</Col>
						</Row>
						{/* folders.map((folder,i) => (
							<div key={folder._id.toString()} className='col-6 col-sm-4 col-md-3 col-lg-2'>
								<div className="btn-group ">
									<button onDoubleClick={e => this.openFolder(e,folder._id)} type="button" className="btn btn-primary botaoPasta">
									<h1 className="font-light text-white"><i  className="fas fa-folder iconePasta"></i></h1>
									</button>
									<button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<span className="sr-only iconePasta">Toggle Dropdown</span>
									</button>
									<div className="dropdown-menu">
										<button className="dropdown-item" onClick={e => this.openFolder(e,folder._id)}><i className="far fa-folder-open"></i>  Abrir</button>
										<button className="dropdown-item" onClick={e => this.renameFolder(e,folder._id,folder.title)}><i className="far fa-edit"></i>  Renomear</button>
										<button className="dropdown-item" onClick={e => this.downloadFolder(e,folder._id,idFolder)}><i className="far fa-file-archive"></i>  Baixar como zip</button>
										<button className="dropdown-item" onClick={e => this.removeFolder(e,folder._id)}><i className="fas fa-trash-alt"></i>  Remover</button>  
										<button className="dropdown-item" onClick={e => this.getInfoFolder(e,folder._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>
									</div>
								</div>
								<br/>
								<p id="nomePasta">
									{folder.title}
								</p>
							</div>	
						)) */}
						{/* files.map((file,i) => {
							//console.log(file.mimetype)
							let [mimetype,ext] = file.mimetype.split('/')
							return(
								<>
								<div key={i.toString()} className='col-6 col-sm-4 col-md-3 col-lg-2'>
									<div className="btn-group ">
										<button onDoubleClick={e => this.openFile(e,file._id)} type="button" className="btn btn-primary botaoPasta">
										<h1 className="font-light text-white">
										{
										(mimetype==='image')?<img src={file.url} className="iconeFile" />:
										(mimetype==='video')?<i style={{color:'#f88'}} className="far fa-file-video iconeFile"></i>:
										(mimetype==='application' && ext==='pdf')?<i style={{color:'#f00'}} className="far fa-file-pdf iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.wordprocessingml.document')?<i style={{color:'rgb(41,85,153)'}} className="far fa-file-word iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.spreadsheetml.sheet')?<i style={{color:'rgb(30,113,69)'}} className="far fa-file-excel iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.presentationml.presentation')?<i style={{color:'rgb(208,69,37)'}} className="far fa-file-powerpoint iconeFile"></i>:
										(mimetype==='audio')?<i style={{color:'rgb(18,142,214)'}} className="fas fa-music iconeFile"></i>:
										<i style={{color:'rgb(67,37,82)'}}  className="fa fa-file-alt iconeFile"></i>
										}
										</h1>
										</button>
										<button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<span className="sr-only iconeFile">Toggle Dropdown</span>
										</button>
										<div className="dropdown-menu">
											<button className="dropdown-item" onClick={e => this.openFile(e,file._id)}><i className="far fa-folder-open"></i>  Abrir</button>
											<button className="dropdown-item" onClick={e => this.renameFile(e,file._id,file.title)}><i className="far fa-edit"></i>  Renomear</button>
											<button className="dropdown-item" onClick={e => this.removeFile(e,file._id)}><i className="fas fa-trash-alt"></i>  Remover</button>  
											<button className="dropdown-item" onClick={e => this.downloadFile(e,file.url,file.title)}><i className="fas fa-file-download"></i> Download</button>
											<button className="dropdown-item" onClick={e => this.getInfoFile(e,file._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>

										</div>
									</div>
									<br/>
									<p id="nomePasta">
										{file.title}
									</p>
								</div>
								</>
							)
						}) */}
						</>
					
					}
				</DashBoard>
			</Container>
{/*-----------------------------------Final-DashBoard------------------------------------*/}

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



