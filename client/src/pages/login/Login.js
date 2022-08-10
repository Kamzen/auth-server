import { Link } from "react-router-dom";

const Login = () => {

    return(
        <>
            <div className="card" style={{width : '30%', margin : 'auto', marginTop : '10%'}}>
                <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <form id="login-form" method="POST">

                        <label htmlFor="email" className="form-label">Email</label>
                        <input type={'email'} id={'email'} placeholder={'Email'} className={'form-control'} autoComplete={'on'} />

                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={'password'} id={'password'} placeholder={'Password'} className={'form-control'} autoComplete={'off'} />

                        <button type="submit" className="btn btn-secondary" style={{width : '100%', marginTop : '10px', fontWeight : 'bolder'}}>Login</button>

                        <Link to={'/signup'} style={{textDecoration : 'none', borderRadius : '10px'}}>
                            <button className="list-group-item" style={{marginTop : '15px', width : '100%'}}>Register
                            </button>
                        </Link>

                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;