import React,{Component} from 'react'

export default class SideBar extends Component{

	render(){
		return(
			<aside className="left-sidebar" data-sidebarbg="skin5">
				<div className="scroll-sidebar">
					<nav className="sidebar-nav">
						<ul id="sidebarnav" className="p-t-30">
                    		<li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="index.html" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu">Dashboard</span></a></li>
                    		<li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="charts.html" aria-expanded="false"><i className="mdi mdi-chart-bar"></i><span className="hide-menu">Charts</span></a></li>
                    		<li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="widgets.html" aria-expanded="false"><i className="mdi mdi-chart-bubble"></i><span className="hide-menu">Widgets</span></a></li>
						</ul>
					</nav>
				</div>
			</aside>
		)
	}
}