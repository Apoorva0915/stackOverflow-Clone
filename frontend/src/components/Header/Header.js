import React from 'react'
import "./css/Header.css"
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom';


const Header = () => {
  const user=useSelector(selectUser)
  const history=useHistory()
  return (
    <div>
      <div className="header-container">
        <div className="header-left">
        <Link to="/">
        <img className='stackoverflowlogo'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
              alt="logo"
              /></Link>
          <h3>Products</h3>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
           <SearchIcon />
           <input type="text" placeholder='Search...' />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
          <Avatar src={user?.photo} onClick={() => {auth.signOut(); history.push("/auth")}}  /> 
            <InboxIcon />
            <HelpIcon />
            <img className='stackexchangeimg'
              src="https://cdn-icons-png.flaticon.com/512/25/25670.png"
              alt="stack-exchange"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header