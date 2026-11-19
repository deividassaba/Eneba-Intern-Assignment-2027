import { Link, useNavigate } from 'react-router-dom';
import './AppMenu.scss';
import SearchBar from '../SearchBar/SearchBar';
import CartIcon from '../icons/CartIcon';
import UserIcon from '../icons/UserIcon';
import { useAuth } from '../../context/AuthContext';

export default function AppMenu() {  
  const navigate = useNavigate();
  const {email, logout} = useAuth();

  const onSearch = (data : string) => {
    navigate("/store/?search="+data)
  }
  
  const handleLogout = ()=> {
    logout()
  }
  return (
    <header className='menu'>
      <div className='topbar'>
        <div className='container topbar-bar'>
          <Link className='logo-link' to="/"><img className='app-logo' src='/assets/logoFull.svg'/></Link>
          <SearchBar onSearch={onSearch}  />
          <><Link to="/cart"><CartIcon/></Link></>
          <div style={{display:'flex',marginLeft:20,alignItems: 'center'}}>
            {email?
            <>
              <Link to="/orders">{email}</Link> 
              <span className='horizontal-divider'>|</span> 
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </>:
            <>
              <Link to="/login"><UserIcon/>Login</Link>
              <span className='horizontal-divider'>|</span>  
              <Link to="/register">Register</Link>
            </>
            }
          </div>
        </div>
      </div>
      <div className='lowerbar'>
        <nav>
        <ul>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/">Cheap Games</Link></li>
          <li><Link to="/">Software</Link></li>
          <li><Link to="/">eGift Cards</Link></li>
          <li><Link to="/">Eneba Gift Cards</Link></li>
          <li><Link to="/">FM27</Link></li>
          <li><Link to="/">Giveaway</Link></li>
          <li><Link to="/">GTA VI</Link></li>
        </ul>
        </nav>
      </div>
      
    </header>
    
  );
}
