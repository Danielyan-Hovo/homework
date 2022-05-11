import React, {Component} from 'react';
import Comments from "./components/Comments";
import './App.css'
import List from "./components/List";

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Comments
                    currentUserId="1"
                />
                <List/>
            </div>
        );
    }
}

export default App;
