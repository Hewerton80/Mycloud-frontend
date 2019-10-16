import React,{Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Mycloud extends Component{
	constructor(props){
		super(props)
		this.state={
			drawer:false
		}
	}
	handleDrawerOpen(){
		this.state({drawer:!this.state.drawer})
	}

	render(){

		return(
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						onClick={()=>this.handleDrawerOpen()}
					>
					'	<MenuIcon/>
					</IconButton>
				</Toolbar>
				<h1>ola, mundo</h1>
			</AppBar>

		)
	}
}