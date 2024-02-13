import { useState, useRef ,useContext} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

import UserProfile from '../Profile/UserProfile';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading,setLoading]=useState(false);
   const [signing,setSignUp]=useState(false);

  const emailRef=useRef();
  const passwordRef=useRef();
   
  const ctx=useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function SignUpHandler() {
  setSignUp(true);
  if(passwordRef.current.value.length>8){
    try{
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzQJiXqoJ7rFl8c59SNmM64xXENyEqIrk',    {
      method:"POST",
      body: JSON.stringify({
        email:emailRef.current.value,
        password:passwordRef.current.value,
       returnSecureToken:true
      }),
      header:{
        'Content-Type':'application/json'
      }
    })
    setSignUp(false);
      emailRef.current.value="";
    passwordRef.current.value="";
  }
    catch(error){
      alert("You are not able to sign Up")
      setSignUp(false);
      emailRef.current.value="";
    passwordRef.current.value="";
      console.log("error occured", error.message);
    }
  }
  else{
    alert("Enter password with more than 8 characters");
  }
    
  }

  async function LoginHandler(){
 setLoading(true);
 if(passwordRef.current.value.length>8){
try{
 const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzQJiXqoJ7rFl8c59SNmM64xXENyEqIrk',
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
  })
  setLoading(false);
    
  if(res.ok){
    alert("Logged In");
    const data=await res.json();
    console.log(data);
    console.log(data.idToken);
    ctx.login(data.idToken);
    
    emailRef.current.value="";
  passwordRef.current.value="";
  }
  else{
console.log("error");
    alert("Authentication Failed...");
    passwordRef.current.value="";
  }
 

}
catch(err){
  
    setLoading(false);
    emailRef.current.value="";
  passwordRef.current.value="";
     console.log("Error" ,err);
  }
 }
 else{
  alert("Enter more than 8 characters in password");
 }  
}

  return (
    <>
   {!ctx.isLogin  &&  <section className={classes.auth}>

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
</section>}
{ctx.isLogin && <UserProfile/>}
   
    </>
  );
};

export default AuthForm;
