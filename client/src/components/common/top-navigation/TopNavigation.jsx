

import { Link } from 'react-router-dom';
import img from '../../../images/default.jpg';

const TopNavigation = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">
        <Link className="navbar-brand" to={'/home'}>Auth Server</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" style={{marginLeft : 'auto', marginRight : 0}}>
        <ul className="navbar-nav mb-2 mb-lg-0">
            {
              localStorage.getItem('userInfo')?.role === 'super-admin' ?
              <>
                <li className="nav-item">
                  <Link to={'#'} className="nav-link"><span>Admin Control Panel</span></Link>
                </li>
              </>
              : 
              ''
            }
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
              !localStorage.getItem('userInfo') ?
              <>
                <li className="nav-item">
                  <Link to={'#'} className="nav-link"><button className='btn btn-secondary' style={{width : '100px'}}>Login</button></Link>
                </li>
                <li className="nav-item">
                  <Link to={'#'} className="nav-link"><button className='btn btn-secondary' style={{width : '100px'}}>Register</button></Link>
                </li>
              </>
              : 
              <li className='nav-item'>
                <Link to={'#'} className="nav-link">
                  <img src={img} alt={'Profile Pic'} style={{width : '28px', height : '28px', borderRadius : '50%'}} />
                </Link>
              </li>
            }
          </ul>
      </div>

      </div>
      
    </nav>
  );
};

export default TopNavigation;
