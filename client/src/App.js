import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {StreamChat} from "stream-chat";
import Cookie from "universal-cookie"
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';
import { useState } from 'react';
import JoinGame from './components/JoinGame';

function App() {
const api_key='f95qe2xnn6t4';
// const api_secret='hvh22wyvp6wmnh5pbjpajev62spet6s8xtp2dd38jr34yz84x9gyydvu5pzce99q';
const cookies = new Cookies();
const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth,setIsAuth] = useState(false);

  const logOut = () =>{
    cookies.remove("token");
      cookies.remove("userId");
      cookies.remove("username");
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("hashedPassword");

      client.disconnectUser();
      setIsAuth(false);

  }

  if(token){
    client.connectUser(
      {
        id:cookies.get("userId"),
        name: cookies.get("username"),
        firstName:cookies.get("firstName"),
        lastName:cookies.get("lastName"),
        hashedPassword:cookies.get("hashedPassword"),
      },
      token
    ).then((user)=>{
      // console.log(user);
      setIsAuth(true);
    })
  }

  return (
    <div>
      <h1 style={{alignItems:'center'}}>Tic-Tac-Toe</h1>
      <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}> Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
    </div>
  );
}

export default App;
