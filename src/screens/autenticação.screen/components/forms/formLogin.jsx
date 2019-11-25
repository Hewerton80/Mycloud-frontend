import React from 'react'
import ImgLoading from '../../../../assets/img/loading2.gif'
export default props =>{
	const {msgErroLogin,requesting, emailLogin ,passwordLogin} = props
	const {handlerEmail,handlerPassword,onSubmit} = props
	return(
		<form className="form-horizontal m-t-20" onSubmit={e=> onSubmit(e)}>
		    <div className="row p-b-30" id='divform'>
		        <div className="col-12">
                    <div style={{color:'red'}} className='text-center'>
                        {msgErroLogin || ''}
                    </div>

		            <div className="input-group mb-3">
		                <div className="input-group-prepend">
		                    <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-email"></i></span>
		                </div>
		                <input onChange={e=> handlerEmail(e) } value={emailLogin} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
		            </div>


		            <div className="input-group mb-3"> 
		                <div className="input-group-prepend">
		                    <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
		                </div>
		                <input onChange={e=> handlerPassword(e) } value={passwordLogin} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
		            </div>
		        </div>
		    </div>
		    <div className="row border-top border-secondary">
		        <div className="col-12">
		            <div className="form-group">
		                <div className="p-t-20 divbuttons">
		                    {requesting?
		                    <button className="btn btn-block btn-lg btn-info" disabled>
		                        <img src={ImgLoading} width='20px'/>
		                    </button>:
		                    <button type='submit' className="btn btn-block btn-lg btn-info" >
		                        Fazer login
		                    </button>}
		                    
		                </div>
		            </div>
		        </div>
		    </div>

		</form>
	)
}