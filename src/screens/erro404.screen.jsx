import React from 'react'

export default function(){
	return (
		<div id="main-wrapper">
	        <div className="error-box">
				<div className="error-body text-center">
					<h1 className="error-title text-danger">404</h1>
					<h3 className="text-uppercase error-subtitle">ERRO</h3>
			        <p className="text-muted m-t-30 m-b-30">A URL solicitado não foi encontrado neste servidor</p>
			    </div>
			</div>
		</div>
	)
}