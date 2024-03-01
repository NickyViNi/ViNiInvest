import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";
import logo from "./logo/dandelion.png"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from "react-redux";

function Navigation({ isLoaded} ) {

  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="header">
      <div className="logo-container">
        <img id="logo" src={logo} alt="viniinvest logo" onClick={() => navigate('/')} />
        <span id='company-name' onClick={() => navigate('/')}>ViNiInvest</span>
      </div>

      {isLoaded && (
          <div id="user-menu-container">
            <ProfileButton id='profile-button' user={sessionUser} />
          </div>

      )}
    </div>
  );
}

export default Navigation;
