import React,{Fragment} from 'react'
import ImgLoading from '../assets/img/loading2.gif'

export default (props) =>{
	console.log('-------components--------');
	console.log(props);
	const {folders,files,idFolder} = props

	return(
		<Fragment>

	                		{/*botões de navegação de pastas*/}
							{folders.map((folder,i) => {

								return(
					            <div key={i.toString()} className='col-6 col-sm-4 col-md-3 col-lg-2'>
						            <div className="btn-group ">
						                <button onDoubleClick={e => props.openFolder(e,folder._id)} type="button" className="btn btn-primary botaoPasta">
										<h1 className="font-light text-white"><i  className="fas fa-folder iconePasta"></i></h1>
						                </button>
						                <button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						                    <span className="sr-only iconePasta">Toggle Dropdown</span>
						                </button>
						                <div className="dropdown-menu">
						                    <button className="dropdown-item" onClick={e => props.openFolder(e,folder._id)}><i className="far fa-folder-open"></i>  Abrir</button>
						                    <button className="dropdown-item" onClick={e => props.renameFolder(e,folder._id,folder.title)}><i className="far fa-edit"></i>  Renomear</button>
						                    <button className="dropdown-item" onClick={e => props.downloadFolder(e,folder._id,idFolder)}><i className="far fa-file-archive"></i>  Baixar como zip</button>
						                    <button className="dropdown-item" onClick={e => props.removeFolder(e,folder._id)}><i className="fas fa-trash-alt"></i>  Remover</button>  
						                    <button className="dropdown-item" onClick={e => props.getInfoFolder(e,folder._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>
						                </div>
						            </div>
						            <br/>
						            <p id="nomePasta">
						            	{folder.title}
						            </p>
						        </div>
						        )
						    })}

							{files.map((file,i) => {
								//console.log(file.mimetype)
								let [mimetype,ext] = file.mimetype.split('/')
								return(
					            <div key={i.toString()} className='col-6 col-sm-4 col-md-3 col-lg-2'>
						            <div className="btn-group ">
						                <button onDoubleClick={e => props.openFile(e,file._id)} type="button" className="btn btn-primary botaoPasta">
										<h1 className="font-light text-white">
										{
										(mimetype==='image')?<img src={file.url} className="iconeFile" />:
										(mimetype==='video')?<i style={{color:'#f88'}} className="far fa-file-video iconeFile"></i>:
										(mimetype==='application' && ext==='pdf')?<i style={{color:'#f00'}} className="far fa-file-pdf iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.wordprocessingml.document')?<i style={{color:'rgb(41,85,153)'}} className="far fa-file-word iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.spreadsheetml.sheet')?<i style={{color:'rgb(30,113,69)'}} className="far fa-file-excel iconeFile"></i>:
										(mimetype==='application' && ext==='vnd.openxmlformats-officedocument.presentationml.presentation')?<i style={{color:'rgb(208,69,37)'}} className="far fa-file-powerpoint iconeFile"></i>:
										(mimetype==='audio')?<i style={{color:'rgb(18,142,214)'}} className="fas fa-music iconeFile"></i>:
										<i style={{color:'rgb(67,37,82)'}}  className="fa fa-file-alt iconeFile"></i>
										}
										</h1>
						                </button>
						                <button  type="button" className=" btn btn-primary dropdown-toggle dropdown-toggle-split botaoPasta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						                    <span className="sr-only iconeFile">Toggle Dropdown</span>
						                </button>
						                <div className="dropdown-menu">
						                    <button className="dropdown-item" onClick={e => props.openFile(e,file._id)}><i className="far fa-folder-open"></i>  Abrir</button>
						                    <button className="dropdown-item" onClick={e => props.renameFile(e,file._id,file.title)}><i className="far fa-edit"></i>  Renomear</button>
						                    <button className="dropdown-item" onClick={e => props.removeFile(e,file._id)}><i className="fas fa-trash-alt"></i>  Remover</button>  
						                    <button className="dropdown-item" onClick={e => props.downloadFile(e,file.url,file.title)}><i className="fas fa-file-download"></i> Download</button>
											<button className="dropdown-item" onClick={e => props.getInfoFile(e,file._id)}><i className="fas fa-info-circle"></i> Ver detalhes</button>

										</div>
						            </div>
						            <br/>
						            <p id="nomePasta">
						            	{file.title}
						            </p>
						        </div>
						        )
						    })}
		</Fragment>

	)
}