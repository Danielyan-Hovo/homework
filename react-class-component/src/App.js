import Post from "./components/Post";
import {useEffect, useState} from "react";
import Statistics from "./components/Statistics";



function App() {

  return (
    <div className='App'>
      <Post/>
        <Statistics/>
    </div>
  );
}

export default App;
