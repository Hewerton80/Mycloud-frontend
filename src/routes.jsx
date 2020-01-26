import React from 'react'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import LoginScreen from './screens/autenticação.screen/login.screen'
import RegisterScreen from './screens/autenticação.screen/register.screen'

import MycloudScreen from './screens/sistema.screen/mycloud.screen'
import Trash from './screens/sistema.screen/lixeira.screen'
import Erro404 from './screens/erro.screen/erro404.screen'



export default () => 
	<BrowserRouter>
		<Switch>
				<Route exact
					path=  '/login' 
					component = {LoginScreen} 
				/>
				<Route exact
					path=  '/register' 
					component = {RegisterScreen} 
				/>
				<Route exact
					path='/drive/:id' 
					component = {MycloudScreen} 
				/>

				<Route exact
					path='/lixeira/:id' 
					component = {Trash} 
				/>
				<Route exact
					path='/erro404' 
					component = {Erro404} 
				/>
				<Redirect
					from="/"
					to='/login'
				/>
				<Redirect
					from="*"
					to='/erro404'
				/>		
		</Switch>
	</BrowserRouter>

