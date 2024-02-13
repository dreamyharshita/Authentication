import {  Route,Switch,Redirect} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext,useEffect } from 'react';
import AuthContext from './store/auth-context';



function App() {
  const ctx=useContext(AuthContext);
  useEffect(()=>{
      const tok=localStorage.getItem("token");
     
      if(tok===null){
        localStorage.removeItem("token");
      }
      else{
        ctx.token=tok;
        ctx.login(tok);

      }
    
  },[ctx]);
 
  return (
    <Layout>
      
        <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
      {ctx.isLogin && <Route path='/profile'>
<UserProfile/>
        </Route> }  
      {!ctx.isLogin &&  <Route path='/auth'>
       <AuthPage />
        </Route>}  
        {ctx.isLogin && <Redirect to="/profile"/>}
      
       <Route path="*">
<Redirect to="/auth"></Redirect>
       </Route>
        
        </Switch>
        
    </Layout>
  );
}

export default App;
