import React,{Component} from 'react'
import ButtonPasta from '../ui/buttonPasta'
import api from '../../services/api'

export default class DashBoard extends Component{
	render(){
        console.log(this.props.idFolder)
		return(
			<div className="page-wrapper">
				<div className="page-breadcrumb">
                	<div className="row">
                    	<div className="col-12 d-flex no-block align-items-center">
                        	<div className=" text-left">
                            	<nav aria-label="breadcrumb">
                                	<ol className="breadcrumb">
                                    	<li className="breadcrumb-item"><a href="#">Home</a></li>
                                    	<li className="breadcrumb-item"><a href="#">Library</a></li>
                                	</ol>
                            	</nav>
                        	</div>
                    	</div>
                	</div>
            	</div>
				<div className="container-fluid">
                	<div className="row">
                		<ButtonPasta idFolder = {this.props.idFolder} />
                    </div>
				</div>
            	<footer className="footer text-center">
                	All Rights Reserved by Matrix-admin. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
            	</footer>
			</div>


		)
	}
}