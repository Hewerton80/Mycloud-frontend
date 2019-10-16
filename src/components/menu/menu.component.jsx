import React,{Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
const iconsToolBar={
    cursor:'pointer',
    fontSize:'25px'
}
const drawerContainer={
    height:'64px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    
}
const iconsDrawer={
    cursor:'pointer',
    fontSize:'25px',
    paddingLeft:'24px'
    
}
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
		const {showDrawer} = this.state
		return(
			<AppBar position="fixed">
				<Toolbar>
				<i 
					className="fas fa-bars" 
					onClick={()=>this.handleDrawerOpen()}
					style={iconsToolBar}
				/>
				<Drawer
					variant="persistent"
					anchor="left"
					open={showDrawer}
				>
                    <div style={drawerContainer}>
					<   i class="fas fa-chevron-left"
						    onClick={()=>this.handleDrawerOpen()}
						    style={iconsDrawer}
					/>
                    </div>
					<Divider />
					<List>
						<ListItem style={{backgroundColor:'red'}}>
							<ListItemIcon >
								<i className='fas fa-cloud'></i>
							</ListItemIcon>
							<ListItemText primary={"MyCloud"}/>							
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<i className='fas fa-imbox'></i>
							</ListItemIcon>
							<ListItemText primary={"Imbox"}/>							
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<i className='fas fa-imbox'></i>
							</ListItemIcon>
							<ListItemText primary={"Imbox"}/>							
						</ListItem>
					
					</List>
				</Drawer>	
				</Toolbar>
				
			</AppBar>

		)
	}
}