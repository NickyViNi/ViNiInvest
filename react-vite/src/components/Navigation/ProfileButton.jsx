import { useState, useEffect, useRef } from "react";
import { useDispatch} from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  //navigate to portfolios page:
  const navigateToPortfolios = () => {
    closeMenu();
    navigate("/portfolios");
  }

  //navigate to stocks page:
  const navigateToStocks = () => {
    closeMenu();
    navigate("/stocks");
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const profileClassName = "profile-button " + (user ? "avatar-button" : "")

  return (
    <div>
      <button className={profileClassName}  onClick={toggleMenu}>
        {user? <img id="profile-image" src={user.profile_image_url ? user.profile_image_url : "https://viniinvest-bucket.s3.us-west-2.amazonaws.com/xingdailu.jpg"} alt="user profile" /> : (
        <>
          <i id='menu-bar' className='fas fa-bars' />
          <i id='profile-icon' className="fas fa-user-circle fa-lg" />
        </> )}
      </button>

      <div id='dropdown-menu' className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.username}</div>
            <div>{user.email}</div>

            <div className='menu-separator'></div>
            <div className="navigate-to-page" onClick={navigateToPortfolios} title="Click to View Portfolios">Manage Portfolios</div>
            <div className="navigate-to-page" onClick={navigateToStocks} title="Click to View Stocks">View Stocks</div>
            <div className='menu-separator'></div>

            <div>
              <button id='logout-button' onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div className='sign-up-menu'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='log-in-menu'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default ProfileButton;
