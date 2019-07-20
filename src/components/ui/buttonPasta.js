import React,{Component} from 'react'
import api from '../../services/api'
export default class ButtonPasta extends Component{
	state={
		idFolder: this.props.idFolder,
		folders: '',
		files:''
	}
	async componentDidMount(){ 
		const response = await api.get(`mycloud/${this.state.idFolder}`)
		//console.log(response);
		if(response){
			this.setState({
				folders : response.data.folders,
				fildes  : response.data.files
			})
		}

	}
	henderButton(e,msg){
		console.log(msg)
	}
	render(){
		const {folders,files} = this.state.folders

		return(

		folders && folders.map(folder => (
            <div className='col-6 col-sm-4 col-md-3 col-lg-2'>
	            <div className="btn-group ">
	                <button onDoubleClick={e => this.henderButton(e,folder._id)} type="button" className="btn btn-primary botaoPasta">
					<h1 className="font-light text-white"><i  className="fas fa-folder iconePasta"></i></h1>
	                </button>
	                <button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                    <span className="sr-only iconePasta">Toggle Dropdown</span>
	                </button>
	                <div className="dropdown-menu">
	                    <a className="dropdown-item" href="#"><i className="far fa-folder-open"></i>  Abrir</a>
	                    <a className="dropdown-item" href="#"><i className="far fa-edit"></i>  Renomear</a>
	                    <a className="dropdown-item" href="#"><i className="fas fa-trash-alt"></i>  Remover</a>  
	                    <a className="dropdown-item " href="#"><i className="fas fa-info-circle"></i> Ver detalhes</a>
	                </div>
	            </div>
	            <br/>
	            <p id="nomePasta">
	            	{folder.title}
	            </p>
	        </div>
	    ))

		)
	}
}