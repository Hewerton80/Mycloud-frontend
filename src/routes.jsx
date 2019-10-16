import React from 'react'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import LoginScreen from './screens/autenticação.screen/autenticacao.screen'
import MycloudScreen from './screens/sistema.screen/mycloud.screen'
import Trash from './screens/sistema.screen/lixeira.screen'
import Erro404 from './screens/erro.screen/erro404.screen'
import Teste from './screens/sistema.screen/teste.screen'



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
					path='/teste' 
					component = {Teste} 
				/>,
				<Route exact
					path='/lixeira/:id' 
					component = {Trash} 
				/>,
				<Route exact
					path='/erro404' 
					component = {Erro404} 
				/>,
				{/*<Redirect
					from="*"
					to='/erro404'
				/>*/}
				
			]
			
		</Switch>
	</BrowserRouter>

