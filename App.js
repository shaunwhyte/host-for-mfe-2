import React, { useState } from "react";
import { useEffect } from "react";
import { Observable, tap } from "rxjs";
import ErrorBoundary from "./ErrorBoundary";
import { getObservable } from "./observable";
const RemoteApp = React.lazy(() => import("PeerSever/App"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      border: "1px solid red",
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

export const App = () => {
 
  let [name, setName] = useState("");
  let [messages, setMessages] = useState([]);
 
  useEffect( () => {
    console.log("use effect runnning ")
      getObservable().pipe(
        tap(msg => {
            console.log("Got ", msg);
            let data = msg.replace("Server:", "").replace("Connection:", "").replace("Message:", "");
            if(msg.includes("Server:")){
              setName(data);
            }
            if(msg.includes("Message:")){
              setMessages([...messages, data]);
            }
        })
      ).subscribe();
  }, [messages, name]);

  return (
    <div style={{ minHeight: "500px", background: "rgba(0, 0, 200, 0.3)" }}>
    <h2>Host App:</h2>
    <h3>{name}</h3>
    <h2>Remote App:</h2>
    <RemoteWrapper>
      <RemoteApp name={"Fanta"}/>
    </RemoteWrapper>
    <br />
    <div>Messages: {messages.map( (t, index) => {
      return <div key={index} >{t} <br></br></div> ;
    }) }
    </div>
  </div>
  )
}


export default App;
