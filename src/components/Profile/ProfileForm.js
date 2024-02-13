import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordRef=useRef();
  const authCtx=useContext(AuthContext);
  const submitHandler=(e)=>{
  e.preventDefault();
   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDzQJiXqoJ7rFl8c59SNmM64xXENyEqIrk',{
    method:'POST',
    body:JSON.stringify(
      {
        idToken:authCtx.token,
        password:passwordRef.current.value,
        returnSecureToken:true
      }
    ),
    headers:{
      'Content-Type':'application/json'
    }
  }
  ).then((res) =>{
    alert("password changed");
    passwordRef.current.value="";
  
  })
  }
  return (
    <form className={classes.form}>
    
      <div className={classes.control}>
        
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
