import React from 'react'

export default props => (
	<div className="main-wrapper">
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
            <div className="auth-box bg-dark border-top border-secondary">
            	{props.children}
            </div>
         </div>
    </div>
)