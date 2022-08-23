import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/user/userInfo"
import img from '../../images/default.jpg';


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { userInfo } = useSelector(store => store.user);

  useEffect(() => {
    
    if(!localStorage.getItem('userInfo')){
      navigate('/login')
    }else{
      dispatch(fetchUser());
    }
    
  },[dispatch, navigate])

  const logout = async (e) => {
    e.preventDefault();
    try{
      const resp = await axios.get('http://localhost:5000/auth/logout',{withCredentials : true});
      if(!resp.data.status){
        localStorage.clear();
        navigate('/login');
      }
    }catch(err){
      console.log(err)
    }

  }

  // if(!userInfo.userLoggedInData){
  //   return <div className="text-center" onClick={() => dispatch(fetchUser())}><button className="btn btn-secondary">Fetch User Info</button></div>
  // }

  return (
    <div className="container-fluid">
      <div className="card" style={{width : '500px', margin : 'auto', marginTop : '10px'}}>
        <div className="card-body text-center">
          <div className="card-title h4" style={{}}>User Information</div>
          <div><img style={{width : '150px', height : '150px', borderRadius : '50%'}} src={img} alt={'Image1'} /></div>
          <span> Name : { userInfo.userLoggedInData?.firsName }</span><br />
          <span>Surname : { userInfo.userLoggedInData?.lastName } </span><br />
          <span>Username : { userInfo.userLoggedInData?.username }</span><br />
          <span>Email : { userInfo.userLoggedInData?.email } </span><br />
          <button onClick={(e) => logout(e)} className="btn btn-secondary" style={{width : '300px', marginTop : '10px'}}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Home