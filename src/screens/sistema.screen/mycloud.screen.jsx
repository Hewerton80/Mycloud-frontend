import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import Swal from 'sweetalert2'
import {Snackbar,CircularProgress} from '@material-ui/core'
import {SideBar,SideBarNav,SideBarItem} from "../../components/SideBar/styled"
import {AppBar,AppBarBrand,AppBarSeache,AppBarProfile} from "../../components/AppBar/styled"
import {Folder,FolderHead,FolderOptions} from "../../components/Folder/styled"
import {File,FileHeader,FileFooter,FileName,FileOptions} from "../../components/File/styled"
import {FaCloud,FaTrash,FaSearch,FaPowerOff,FaChevronRight,FaFolderPlus,FaUpload,FaFolder,FaPlus,FaEllipsisV,FaFolderOpen,FaEdit,FaFileArchive,FaTrashAlt,FaInfoCircle,FaFileVideo,FaFilePdf,FaFileDownload,FaFileWord,FaFileExcel,FaFilePowerpoint,FaMusic,FaFileAlt} from "react-icons/fa"
import {DropDown,DropDownContent,DropDownToogle} from "../../components/DropDown"
import {Container,DashBoard} from "../../components/Containers/styled"
import {ButtonPlus} from "../../components/ButtonPlus/styled"
import {NavLink} from "../../components/NavLink/styled"
import {Row,Col} from "../../components/Grid/styled"
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

	async componentDidMount(){ 
		
		window.document.title ='mycloud'
		this.updateDashBoard()
		console.log('didMount');
		console.log("props:",this.props)
	}
	componentWillUnmount(){
		window.removeEventListener("popstate", this.setHistory);
	}
	// componentWillUpdate(){
	// 	window.removeEventListener("popstate", this.setHistory);
	// }
	async updateDashBoard(id = this.props.match.params.id){
		try{
			this.setState({loadingDashboard:true})
			const response = await api.get(`mycloud/${id}`)
			console.log('update dashboard:');
			console.log(response.data)
			this.setState({
				idFolder 			  : response.data._id,
				folders  			  : response.data.folders,
				pathList 			  : response.data.pathList,
				files    			  : response.data.files,
				loadingDashboard      : false,
				erroConectionInternet : false	
			})	
		}
		catch(err){
			console.log(err)
			this.handlerErro(err)
		}		
	}
	handlerErro = async err => {
		console.log(err);
		this.setState({loadingDashboard:false})
		if(err.message==='Network Error'){
			this.setState({erroConectionInternet:true})
		}
		else if(err.response && err.response.status === 421){
			this.setState({redirect:'/erro404'})
		}
		else if(err.response && err.response.status === 404){
			this.setState({redirect:'/erro404'})
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
		console.log(id)
		this.props.history.push(`/drive/${id}`)
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
	async renameFolder(e,folder,name){
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
				await api.put(`mycloud/update/folder/${folder._id}`,request)
				//console.log(response.data) 
				//console.log('deu certo renomear')
				const {folders} = this.state
				this.setState({
					folders:folders.map(f=>{
						if(folder._id===f._id){
							const folderRenamed = JSON.parse(JSON.stringify(f))
							folderRenamed.title = value
							console.log(folderRenamed)
							return folderRenamed
						}
						return f
					})
				})
				const Toast2 = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer:3000
				});
				Toast2.fire({
					type: 'success',
					title: 'Pasta renomeada com sucesso'
				})
				//await this.updateDashBoard(response.data._id)
				
			}
		}
		catch(err){
			this.handlerErro(err)
			Swal.fire({
				type: 'error',
				title: 'Oops...',
				text: 'Pasta não pôde ser renomeada!',
			})	
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
	removeFolder = async (e,folder)=>{
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
				await api.put(`/mycloud/delete/folder/${folder._id}`)
				const {folders} = this.state
				this.setState({
					folders:folders.filter(f=>f._id!==folder._id)
				})
				const Toast2 = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer: 3000
				});
				Toast2.fire({
					type: 'success',
					title: 'Pasta movida para lixeira com sucesso'
				})
				//this.updateDashBoard(response.data._id)
				
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
	renameFile = async(e,file,name) => {
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
				await api.put(`mycloud/update/file/${file._id}`,request)
				//console.log(response.data) 
				//console.log('deu certo renomear')
				const {files} = this.state
				this.setState({
					files:files.map(f=>{
						if(file._id===f._id){
							const fileRenamed = JSON.parse(JSON.stringify(f))
							fileRenamed.title = value
							console.log(fileRenamed)
							return fileRenamed
						}
						return f
					})
				})
				const Toast1 = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer:3000
				});
				Toast1.fire({
					type: 'success',
					title: 'Arquivo renomeado com sucesso'
				})
				//this.updateDashBoard(response.data._id)
				
			}
		}
		catch(err){
			this.handlerErro(err)
			Swal.fire({
				type: 'error',
				title: 'Oops...',
				text: 'Arquivo não pôde ser renomeada!',
			})	
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
	removeFile = async (e,file) => {
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
				await api.put(`/mycloud/delete/file/${file._id}`)
				//console.log(response)
				const {files} = this.state
				this.setState({
					files:files.filter(f=>f._id!==file._id)
				})
				const Toast1 = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer: 3000
				});
				Toast1.fire({
					type: 'success',
					title: 'Arquivo movida para lixeira com sucesso'
				})
				//this.updateDashBoard(this.state.idFolder)
				
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
	setHistory = e =>{
		//console.log('evento history');
		e.preventDefault()
		//console.log(e)
		this.updateDashBoard(this.props.match.params.id)
	}
	render(){

		window.addEventListener("popstate", this.setHistory);
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
					<div>
						<FaSearch/>
						<input 
							type="text"
							placeholder="Pesquise no Drive"
						/>
					</div>
				</AppBarSeache>
				<AppBarProfile>
					<div id="barProfile">
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
					</div>
				</AppBarProfile>
				</AppBar>
{/*--------------------------------	-Final-NavBar--------------------------------------*/}


				<Container>
{/*-------------------------------------SideBarr---------------------------------------*/}
				
					<SideBar>
						<SideBarNav>
							<SideBarItem active> 
								<Link  to={`/drive/${localStorage.getItem('id.mycloud')}`} onClick={()=> this.updateDashBoard(localStorage.getItem('id.mycloud'))} >
									<FaCloud/>
									<span className="hide-menu">
										Início
									</span>
								</Link>
							</SideBarItem>
							<SideBarItem> 
								<Link  to={`/lixeira/${localStorage.getItem('id.trash')}`}>
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
						<div id="dashboard">
						<Row>
							<NavLink>
								{pathList.map((path,i)=>{
									let [nome,id] = path.split(' -- ')
									return(
										<React.Fragment key={path}>
										{i!==0 && <FaChevronRight/>}
										<span key={i} className="breadcrumb-item" >
											<Link to={`/drive/${id}`} onClick={ ()=> this.updateDashBoard(id) }>
												{i===0?'Início':nome}
											</Link>
										</span>
										</React.Fragment>
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
								{folders.length>0 && <p style={{margin:"7px"}}>Pastas</p>}
							</Col>
						</Row>
						<Row>
							{folders.map((folder,i)=>
								<Col xs={12} sm={4} md={3} lg={3} key={folder.id.toString()}>
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
														<li onClick={e => this.openFolder(e,folder._id)}><p><FaFolderOpen/>  Abrir</p></li>
														<li onClick={e => this.renameFolder(e,folder,folder.title)}><p  ><FaEdit/>  Renomear</p></li>
														<li onClick={e => this.downloadFolder(e,folder._id,idFolder)}><p><FaFileArchive/>  Baixar como zip</p></li>
														<li onClick={e => this.removeFolder(e,folder)}><p><FaTrashAlt/>  Remover</p>  </li>
														<li onClick={e => this.getInfoFolder(e,folder._id)}><p><FaInfoCircle/> Ver detalhes</p>	</li>
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
								{files.length>0 &&<p style={{margin:"7px"}}>Arquivos</p>}
							</Col>
						</Row>
						<Row>
							{files.map((file,i) => {
								let [mimetype,ext] = file.mimetype.split('/')
								return(
									<Col xs={12} sm={6} md={4} lg={3} key={file.id.toString()}>
										<File>
											<FileHeader onDoubleClick={e => this.openFile(e,file._id)}>
											{
												(mimetype==='image')?<img src={file.url}/>:
												(mimetype==='video')?<FaFileVideo color='#f88'/>:
												(mimetype==='application' && ext==='pdf')?<FaFilePdf color="#f00" />:
												(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.wordprocessingml.document')?<FaFileWord color="rgb(41,85,153)"/>:
												(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.spreadsheetml.sheet')?<FaFileExcel color="rgb(30,113,69)"/>:
												(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.presentationml.presentation')?<FaFilePowerpoint color="rgb(208,69,37)"/>:
												(mimetype==='audio')?<FaMusic color="rgb(18,142,214)"/>:
												<FaFileAlt color="rgb(67,37,82)"/>
											}	
											</FileHeader>
											<FileFooter>
												<FileName>
													<p id="filename">{file.title}</p>
												</FileName>
												<FileOptions>
													<DropDown>
														<DropDownToogle htmlFor={"file"+i} id={"fileToogle"+i}>
															<span><FaEllipsisV/></span>
														</DropDownToogle>
														<DropDownContent id={"file"+i} translate="-124px,-190px">
															<ul>
																<li onClick={e => this.openFile(e,file._id)}><p><FaFolderOpen/>Abrir</p></li>
																<li onClick={e => this.renameFile(e,file,file.title)}><p><FaEdit/> Renomear</p></li>
																<li onClick={e => this.removeFile(e,file)}><p><FaTrashAlt/>  Remover</p></li> 
																<li onClick={e => this.downloadFile(e,file.url,file.title)}><p><FaFileDownload/> Download</p></li>
																<li onClick={e => this.getInfoFile(e,file._id)}><p><FaInfoCircle/> Ver detalhes</p></li>
															</ul>
														</DropDownContent>
													</DropDown>
												</FileOptions>	
											</FileFooter>
										</File>
									</Col>
								)
							})
							}
						</Row>
						</>
					}
					</div>
					<ButtonPlus>
						<DropDown>
							<DropDownToogle htmlFor="new" id="idToogle">
								<button id="button-new"><FaPlus/> </button>
							</DropDownToogle>
							<DropDownContent id="new" translate="-250px,-150px">
								<ul>
									<li onClick={e => this.criaPasta(e)}><FaFolderPlus/><p> Nova pasta</p></li>
									<li onClick={e => {inputOpenFileRef.current.click()}}><FaUpload/> <p>Upload de arquivo</p></li>
									<input  type='file' ref={inputOpenFileRef} onChange={e => this.uploadFile(e,idFolder)} />
								</ul>
							</DropDownContent>
						</DropDown>
					</ButtonPlus>
				</DashBoard>
{/*-----------------------------------Final-DashBoard------------------------------------*/}
			</Container>
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



