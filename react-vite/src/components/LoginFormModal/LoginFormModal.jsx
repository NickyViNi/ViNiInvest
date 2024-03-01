import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
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
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <label>
          Email / Username
          <input
            type="text"
            value={emailUsername}
            onChange={(e) => setEmailUserName(e.target.value)}
            required
          />
        </label>
        {errors.email_username && <p className="credential-errors">{errors.email_username}</p>}
        <label>
          Password
          <input
            type="password"
            spellCheck={false}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="modal-errors">{errors.password}</p>}
        <button type="submit">Log In</button>
        <div id='demo-user-btn' onClick={e => handleSubmit(e, 'nickyli', 'password')}>Demo User</div>
      </form>
    </>
  );
}

export default LoginFormModal;
