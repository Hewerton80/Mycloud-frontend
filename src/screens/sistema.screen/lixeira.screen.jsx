import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import Swal from 'sweetalert2'
import {Snackbar,CircularProgress} from '@material-ui/core'
import {SideBar,SideBarNav,SideBarItem} from "../../components/SideBar/styled"
import {AppBar,AppBarBrand,AppBarSeache,AppBarProfile} from "../../components/AppBar/styled"
import {Folder,FolderHead,FolderOptions} from "../../components/Folder/styled"
import {File,FileHeader,FileFooter,FileName,FileOptions} from "../../components/File/styled"
import {FaCloud,FaTrash,FaSearch,FaPowerOff,FaFolder,FaEllipsisV,FaFolderOpen,FaEdit,FaInfoCircle,FaFileVideo,FaFilePdf,FaFileDownload,FaFileWord,FaFileExcel,FaFilePowerpoint,FaMusic,FaFileAlt} from "react-icons/fa"
import {DropDown,DropDownContent,DropDownToogle} from "../../components/DropDown"
import {Container,DashBoard} from "../../components/Containers/styled"
import {Row,Col} from "../../components/Grid/styled"
import {NavLink} from "../../components/NavLink/styled"
import Imguser from '../../assets/img/user.jpg'
import driveLogo from '../../assets/img/google-drive.png'
//import socket from 'socket.io-client'
export default class Lixeira extends Component{

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
		window.document.title ='lixeira'
		this.updateDashBoard()
		
	}
	async updateDashBoard(id=localStorage.getItem('id.trash')){
		try{
			this.setState({loadingDashboard:true})
			const response = await api.get(`trash/${id}`)
			console.log(response)
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
		console.log(err.message);
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
	async restoreFolder(e,id){
		try{
			const Toast = Swal.mixin({
				toast: true,
				position: 'bottom-start',
				showConfirmButton: false,
				
			});
			Toast.fire({
				title: 'Restaurando pasta'
			})
			Swal.showLoading()
			const response = await api.put(`trash/restore/folder/${id}`)
			console.log(response.data) 
			if(response.status===200){
				console.log('Restaurado com sucesso')
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer:3000
				});
				Toast.fire({
					type: 'success',
					title: 'Pasta restaura com sucesso'
				})
				await this.updateDashBoard()
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	removePermanentementeFolder = async (e,id)=>{
		try{
			const {value} = await Swal.fire({
				title: 'Tem certeza que quer remover permanentemente esta pasta?',
				//text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim, remover permanentemente'
			})
			if (value) {
				try{
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						
					});
					Toast.fire({
						title: 'Removendo pasta permanentemente'
					})
					Swal.showLoading()
					const response = await api.delete(`/trash/delete/folder/${id}`)
					console.log(response)
					if(response.status===200){
						const Toast = Swal.mixin({
							toast: true,
							position: 'bottom-start',
							showConfirmButton: false,
							timer: 3000
						});
						Toast.fire({
							type: 'success',
							title: 'Pasta removida permanentemente com sucesso'
						})
						this.updateDashBoard()
					}
				}
				catch(err){
					this.handlerErro(err)		
				}	
			}
		}
		catch(err){
		this.handlerErro(err)
		}
	}
	getInfoFolder = async (e,id) => {
		try{
			const response = await api.get(`mycloud/folder/${id}`)
			console.log(response.data)
			
			if(response.status===200){
				const folder = response.data.folder
				const size = response.data.size
				folder.createdAt = new Date(folder.createdAt)
				folder.updatedAt = new Date(folder.updatedAt)
				console.log(folder.createdAt)
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
	restoreFile = async (e,id) => {
		console.log('restore frontend');
		try{
			const Toast = Swal.mixin({
				toast: true,
				position: 'bottom-start',
				showConfirmButton: false,
				
			});
			Toast.fire({
				title: 'Restaurando arquivo'
			})
			Swal.showLoading()
			const response = await api.put(`trash/restore/file/${id}`)
			console.log(response.data) 
			if(response.status===200){
				console.log('Restaurado com sucesso')
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					timer:3000
				});
				Toast.fire({
					type: 'success',
					title: 'Arquivo restaura com sucesso'
				})
				await this.updateDashBoard()
			}
		}
		catch(err){
			this.handlerErro(err)
		}

	}

	openFile = async (e,id) =>{
		try{
			const response = await api.get(`mycloud/file/${id}`)
			console.log(response);
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

				else if(ext==='mp4'){
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
					/*Swal.fire({
						showConfirmButton: false,
						showCloseButton: true,
						html:`
							<p>clique no link para acessar arquivo</p>
							<h1><a href='${file.url}' target='blank_'> ${file.title}</a></h1>
							`
					})	*/
				}

			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
    
	removePermanentementeFile = async (e,id) => {
		try{
			const {value} = await Swal.fire({
				title: 'Tem certeza que quer remover permanentemente este arquivo?',
				//text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim, remover permanentemente'
			})
			if (value) {
				const Toast = Swal.mixin({
					toast: true,
					position: 'bottom-start',
					showConfirmButton: false,
					
				});
				Toast.fire({
					title: 'removendo arquivo permanentemente'
				})
				Swal.showLoading()
				const response = await api.delete(`trash/delete/file/${id}`)
				console.log(response)
				if(response.status===200){
					const Toast = Swal.mixin({
						toast: true,
						position: 'bottom-start',
						showConfirmButton: false,
						timer: 3000
					});
					Toast.fire({
						type: 'success',
						title: 'Arquivo removida permanentemente com sucesso'
					})
					this.updateDashBoard()
				}
			}
		}
		catch(err){
			this.handlerErro(err)
		}
	}
	getInfoFile = async (e,id) =>{
		try{
			const response = await api.get(`mycloud/file/${id}`)
			console.log(response.data)
			
			if(response.status===200){
				const file = response.data
				file.createdAt = new Date(file.createdAt)
				file.updatedAt = new Date(file.updatedAt)
				console.log(file.createdAt)
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
		console.log('evento history');
		e.preventDefault()
		console.log(e)
		this.updateDashBoard(this.props.match.params.id)
	}*/
	render(){

		//window.addEventListener("popstate", this.setHistory);
		let {folders,files,pathList,erroConectionInternet,loadingDashboard} = this.state;
		let {msgSnackBar,showSnackBar} = this.state
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
							<SideBarItem > 
								<Link to={`/drive/${localStorage.getItem('id.mycloud')}`} onClick={()=> this.updateDashBoard(localStorage.getItem('id.mycloud'))} >
									<FaCloud/>
									<span className="hide-menu">
										Início
									</span>
								</Link>
							</SideBarItem>
							<SideBarItem active> 
								<Link to={`/lixeira/${localStorage.getItem('id.trash')}`} >
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
								<span className="breadcrumb-item">
									Lixeira
								</span>
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
										<Folder key={folder._id.toString()}>
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
															<li onClick={e => this.restoreFolder(e,folder._id)}><p><FaEdit/>  Restaurar</p></li>
															<li onClick={e => this.removePermanentementeFolder(e,folder._id)}><p  ><FaEdit/>  Remover permanentemente</p></li>
															<li onClick={e => this.getInfoFolder(e,folder._id)}><p><FaInfoCircle/>  Ver detalhes</p></li>
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
												(mimetype==='image')?<img src={file.url} alt={file.title}/>:
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
														<DropDownToogle htmlFor={"lfile"+i} id={"lfileToogle"+i}>
															<span><FaEllipsisV/></span>
														</DropDownToogle>
														<DropDownContent id={"lfile"+i} translate="-124px,-190px">
															<ul>
																<li onClick={e => this.openFile(e,file._id)}><p><FaFolderOpen/>  Abrir</p></li>
																<li onClick={e => this.restoreFile(e,file._id)}><p><FaFileDownload/>  Restaurar</p></li>
																<li onClick={e => this.removePermanentementeFile(e,file._id)}><p  ><FaEdit/>  Remover permanentemente</p></li>
																<li onClick={e => this.getInfoFile(e,file._id)}><p><FaInfoCircle/>  Ver detalhes</p></li>
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
						message={<span>Falha na conexão com a internet</span>}

			/>

		</React.Fragment>

		)
	}
}



