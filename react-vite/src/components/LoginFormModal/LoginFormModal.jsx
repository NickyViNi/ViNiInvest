import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailUsername, setEmailUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e, cred, pass) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email_username: cred || emailUsername,
        password: pass || password
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/portfolios");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h2>Log In</h2>
        <label>
          Email / Username
        </label>
        <input
          type="text"
          value={emailUsername}
          onChange={(e) => setEmailUserName(e.target.value)}
          required
        />

        {errors.email_username && <p className="credential-errors">{errors.email_username}</p>}
        <label>
          Password
        </label>
        <input
          type="password"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="credential-errors">{errors.password}</p>}
        <button type="submit" className="handle-submit-btn" >Log In</button>
        <div id='demo-user-btn' onClick={e => handleSubmit(e, 'nickyli', 'password')}>Demo User</div>
      </form>
    </>
  );
}

export default LoginFormModal;
