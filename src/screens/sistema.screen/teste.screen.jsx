import React,{Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Menu from '../../components/menu/menu.component'

export default class Mycloud extends Component{
	constructor(props){
		super(props)
		this.state={
			showDrawer:false
		}
	}
	handleDrawerOpen(){
		console.log('handledrawer')
		this.setState({showDrawer:!this.state.showDrawer})
	}

	render(){
		return(
		<Menu/>
		)
	}
}