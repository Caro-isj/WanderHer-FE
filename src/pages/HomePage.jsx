import React, { useState } from 'react'
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [view, setView] = useState(null)

  const handleSignUpClick = () => {
    setView("signUp")
  }

  const handleLoginClick = () => {
    setView("login")
  }
  return (
    <div>
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
