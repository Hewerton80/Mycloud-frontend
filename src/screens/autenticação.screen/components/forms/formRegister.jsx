import React from 'react'
import ImgLoading from '../../../../assets/img/loading2.gif'
export default props =>{
	const {msgErroRegister,requesting, emailRegister ,passwordRegister,nameRegister,confirmPasswordRegister} = props
	const {handlerName,handlerEmail,handlerPassword,handlerConfirmePassword,Password,onSubmit} = props
	return(
			<form className="form-horizontal m-t-20" onSubmit={e => this.onSubmit(e)}>
				<div className="row p-b-30">

				<div className="col-12">
					{msgErroRegister?
					<div style={{color:'red'}} className='text-center'>
						{msgErroRegister}
					</div>
					:null}
					<div style={{color:'red'}}>
						{this.validator.message('nameRegister', nameRegister, 'required|alpha_space')}
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-user"></i></span>
						</div>
						<input onChange={e=> handlerName(e) } value={nameRegister} type="text" className="form-control form-control-lg" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" required/>
					</div>

					<div style={{color:'red'}}>
						{this.validator.message('emailRegister', emailRegister, 'required|email')}
					</div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
						<span className="input-group-text bg-danger text-white" id="basic-addon1"><i className="ti-email"></i></span>
						</div>
						<input onChange={e=> handlerEmail(e) } value={emailRegister} type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
					</div>
					<div  style={{color:'red'}}>
						{this.validator.message('passwordRegister', passwordRegister, 'required|min:6')}
					</div>
					<div  className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
						</div>
						<input key={1004} onChange={e => handlerPassword(e)} value={passwordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Senha" aria-label="Password" aria-describedby="basic-addon1" required/>
					</div>
					<div  style={{color:'red'}}>
						{this.validator.message('confirmPasswordRegister', confirmPasswordRegister, 'required|min:6|passowordEqual')}
					</div>
					<div  className="input-group mb-3">
						<div className="input-group-prepend">
						<span className="input-group-text bg-info text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
						</div>
						<input  onChange={e => handlerConfirmePassword(e)} value={confirmPasswordRegister.toString()} type="password" className="form-control form-control-lg" placeholder="Confirmação de senha" aria-label="Password" aria-describedby="basic-addon1" required/>
					</div>
				</div>
				</div>
				<div className="row border-top border-secondary">
					<div className="col-12">
						<div className="form-group">
						<div className="p-t-20 divbuttons">
							{requesting?
							<button className="btn btn-block btn-lg btn-info" >
								<img src={ImgLoading} width='20px'/>
							</button>:
							<button className="btn btn-block btn-lg btn-info" >
								Fazer cadastro
							</button>}
						</div>
					</div>
					</div>
				</div>
			</form>
	)
}