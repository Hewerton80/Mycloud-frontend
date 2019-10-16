import React,{Component} from 'react'
import api from '../../services/api'
import Swal from 'sweetalert2'
import Snackbar from '@material-ui/core/Snackbar'

import ImgLoading from '../../assets/img/loading2.gif'
import Imglogo from '../../assets/img/logo-mycloud.png'
import Imguser from '../../assets/img/user.jpg'
//import socket from 'socket.io-client'
import { Redirect } from "react-router-dom";
export default class Lixeira extends Component{

	constructor(props){
		super(props)
		this.state={
			RedirectToToMycloud:false,
			fileSelected:'',
			idFolder: '',
			pathList:'',
			folders: '',
			files:'',
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
			this.setState({redirect:'/'})
			//window.location.href='/'
		}
	}
	async componentDidMount(){ 
		console.log(this.props)
		if(localStorage.getItem('auth-token')){
			window.document.title ='mycloud/lixeira'
			this.updateDashBoard(this.props.match.params.id)
		}
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
	handlerNav = (e,item) =>{
		e.preventDefault()
		if(item === 'inicio'){
			//this.updateDashBoard()
			this.setState({redirect:`/mycloud/${localStorage.getItem('id.mycloud')}`})
			//window.location.href = `/mycloud/${localStorage.getItem('id.mycloud')}`

		}
		else{
			this.updateDashBoard()
			//this.setState({redirect:`/lixeira/${localStorage.getItem('id.trash')}`})
			//window.location.href = `/trash/${localStorage.getItem('id.trash')}`

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
		console.log('evento history');
		e.preventDefault()
		console.log(e)
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

			<div id="main-wrapper"> 	
{/*---------------------------------NavBar--------------------------------------*/}
			    <header  className="topbar" data-navbarbg="skin5">
			        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
		                <div  className="navbar-header" data-logobg="skin5">
		                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href='#' onClick={e => {e.preventDefault()}}><i className="ti-menu ti-close"></i></a>
		                    <a  className="navbar-brand" href='#' onClick={e => {e.preventDefault()}}>
		                        <b className="logo-icon p-l-10">
	                            	<h1><i className="fab fa-cloudversify"></i></h1>
		                        </b>
		                        <span className="logo-text">
		                            <img src={Imglogo} alt="homepage" className="light-logo" />   
		                        </span>
		                    </a>
		                    <a  className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more"></i></a>
		                </div>
		             	<div  className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
		             		<ul  className="navbar-nav float-left mr-auto">
		                        <li key='1' className="nav-item d-none d-md-block"><a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar"><i className="mdi mdi-menu font-24"></i></a></li>
		                        <li key='3' className="nav-item search-box"> <a className="nav-link waves-effect waves-dark" href="javascript:void(0)"><i className="ti-search"></i></a>
		                            <form className="app-search position-absolute">
		                                <input type="text" className="form-control" placeholder="Search &amp; enter"/> <a className="srh-btn"><i className="ti-close"></i></a>
		                            </form>
		                        </li>
		             		</ul>

		             		<ul  className="navbar-nav float-right">
		                        <li key='1' className="nav-item dropdown">
		                            <a  className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={Imguser} alt="user" className="rounded-circle" width="31"/></a>
		                            <div  className="dropdown-menu dropdown-menu-right user-dd animated">
		                            	<p className="dropdown-item"><i className="ti-user m-r-5 m-l-5"></i> {localStorage.getItem('user.name')}</p>
		                                <a className="dropdown-item" href="javascript:void(0)" onClick={e=> this.logout(e)}><i className="fa fa-power-off m-r-5 m-l-5"></i> Logout</a>
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
	                    		<li key='1' className="sidebar-item "> <a className="sidebar-link waves-effect waves-dark sidebar-link" onClick={e => this.handlerNav(e,'inicio')} aria-expanded="false"><i className="fas fa-cloud"></i><span className="hide-menu">Início</span></a></li>
	                    		<li key='2' className="sidebar-item selected"> <a className="sidebar-link waves-effect waves-dark sidebar-link" onClick={e => this.handlerNav(e,'lixeira')} aria-expanded="false"><i className="fas fa-trash"></i><span className="hide-menu">Lixeira</span></a></li>
	                    		
							</ul>
						</nav>
					</div>
				</aside>
{/*-----------------------------------Final-SideBar------------------------------------*/}


{/*------------------------------------DashBoard---------------------------------------*/}

				<div  className="page-wrapper">
	            	{loadingDashboard?
	            	<div  className='text-center'><img src={ImgLoading}/></div>:

					<div  className="container-fluid">
	                	<div  className="row">
	                		{/*botões de navegação de pastas*/}
							{folders ? folders.map((folder,i) => (
					            <div key={i.toString()} className='col-6 col-sm-4 col-md-3 col-lg-2'>
						            <div className="btn-group ">
						                <button type="button" className="btn btn-primary botaoPasta">
										<h1 className="font-light text-white"><i  className="fas fa-folder iconePasta"></i></h1>
						                </button>
						                <button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						                    <span className="sr-only iconePasta">Toggle Dropdown</span>
						                </button>
						                <div className="dropdown-menu">
						                    <button className="dropdown-item" onClick={e => this.restoreFolder(e,folder._id)}><i className="far fa-edit"></i>  Restaurar</button>
						                    <button className="dropdown-item" onClick={e => this.removePermanentementeFolder(e,folder._id)}><i className="fas fa-trash-alt"></i> Remover permanentemente</button>  
						                    <button className="dropdown-item" onClick={e => this.getInfoFolder(e,folder._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>
						                </div>
						            </div>
						            <br/>
						            <p id="nomePasta">
						            	{folder.title}
						            </p>
						        </div>
						    )):null}

							{files ? files.map((file,i) => {
								let [mimetype,ext] = file.mimetype.split('/')
								return(
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
										</h1>						                </button>
						                <button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						                    <span className="sr-only iconePasta">Toggle Dropdown</span>
						                </button>
						                <div className="dropdown-menu">
						                    <button className="dropdown-item" onClick={e => this.openFile(e,file._id)}><i className="far fa-folder-open"></i>  Abrir</button>
						                    <button className="dropdown-item" onClick={e => this.restoreFile(e,file._id)}><i className="fas fa-file-download"></i> restaurar</button>
									        <button className="dropdown-item" onClick={e => this.removePermanentementeFile(e,file._id)}><i className="fas fa-trash-alt"></i>  Remover permanentemente</button>  
											<button className="dropdown-item" onClick={e => this.getInfoFile(e,file._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>

										</div>
						            </div>
						            <br/>
						            <p id="nomePasta">
						            	{file.title}
						            </p>
						        </div>
						        )
						    }):null}
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
						message={<span>Falha na conexão com a internet</span>}

			/>

		</React.Fragment>

		)
	}
}



