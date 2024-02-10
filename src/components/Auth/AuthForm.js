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
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCV5W7x6ty12HJ2jV4jR7lfe7sEAj-ZKbc',
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

 fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV5W7x6ty12HJ2jV4jR7lfe7sEAj-ZKbc',
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
  }).then((res)=>{

    alert("Logged In ");
    console.log(res);
    setLoading(false);
    emailRef.current.value="";
  passwordRef.current.value="";
    console.log("hogya")})
  .catch((err)=>{
    setLoading(false);
    emailRef.current.value="";
  passwordRef.current.value="";
     console.log(err);
  })


  
  
  

 
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
