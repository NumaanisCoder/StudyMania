import React, { useEffect, useState } from 'react';
import style from './SecurityStyle.module.css';
import Admin from '../Admin/Admin';

const Security = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
        if(sessionStorage.getItem("SUIII")){
            setLoggedIn(true);
          }
  
  }, [])
 

  const login = () => {
    const pas = process.env.REACT_APP_SS;
    if (password == pas) {
        sessionStorage.setItem("SUIII",16756235188224)
        setLoggedIn(true);
    } else {
      setError('Error');
    }
  };

  return (
    <div className={style.Security}>
      {!loggedIn ? (
        <div className={style.form}>
            <div className={style.formGroup}>
            <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p>{error}</p>
            </div>
        <div className={style.formGroup}>
          <button onClick={login}>Login</button>

        </div>
        </div>
      ) : (
        <Admin />
      )}
    </div>
  );
};

export default Security;
