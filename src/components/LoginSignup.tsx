import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginSignup: React.FC = () => {
  const { loginWithGoogle, loginWithFacebook, signupWithEmail } = useAuth();

  return (
    <div className="login-signup">
      <button onClick={loginWithGoogle}>Login with Google</button>
      <button onClick={loginWithFacebook}>Login with Facebook</button>
      <form onSubmit={signupWithEmail}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginSignup;