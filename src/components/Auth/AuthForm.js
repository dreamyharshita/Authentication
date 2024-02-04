import { useState, useRef } from 'react';


import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading,setLoading]=useState(false);
   const [signing,setSignUp]=useState(false);

  const emailRef=useRef();
  const passwordRef=useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function SignUpHandler() {
   

  setSignUp(true);

    
    try{
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBthdfJ-193KbiUeJfb1ZaZt4qDbnofutM',
    {
      method:"POST",
      body: JSON.stringify({
        email:emailRef.current.value,
        password:passwordRef.current.value,
       returnSecureToken:true
      }),
      header:{
        'Content-Type':'application/json'
      }
    })}
    catch(error){
      alert("You are not able to sign Up")
      setSignUp(false);
      emailRef.current.value="";
    passwordRef.current.value="";
      console.log("error occured", error.message);
    }
    setSignUp(false);
    emailRef.current.value="";
    passwordRef.current.value="";
  }

  async function LoginHandler(){
 setLoading(true);
   

    setLoading(false);
   
   
    emailRef.current.value="";
    passwordRef.current.value="";
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef}
            type='password'
            id='password'
            required
          />
        </div>
        {!loading && isLogin && <button className={classes.actions} onClick={LoginHandler}>Login</button>}
        {!signing  && !isLogin  &&  <button className={classes.actions} onClick={SignUpHandler} >Sign Up</button>}
        {loading && <p>Loading...</p>}
        {signing && <p>Siging Up</p>}
      
        
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
