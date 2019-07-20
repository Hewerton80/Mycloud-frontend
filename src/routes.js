import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import LoginScreen from './screens/autenticacao.screen'
import MycloudScreen from './screens/mycloud.screen'
import Trash from './screens/lixeira.screen'
import Erro404 from './screens/erro404.screen'


export default () => 
	<BrowserRouter>
		<Switch>
			[
				<Route exact
					path=  '/' 
					component = {LoginScreen} 
				/>,
				<Route exact
					path=  '/mycloud' 
					component = {MycloudScreen} 
				/>,
				<Route exact
					path='/mycloud/:id' 
					component = {MycloudScreen} 
				/>,
				<Route exact
					path='/lixeira/:id' 
					component = {Trash} 
				/>
				<Route exact
					path='/erro404' 
					component = {Erro404} 
				/>
				
			]
			
		</Switch>
	</BrowserRouter>

