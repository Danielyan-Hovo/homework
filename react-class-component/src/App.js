import React, {Component} from 'react';
import Comments from "./components/Comments";

class App extends Component {
    render() {
        console.log('App')

        return (
            <div className='App'>
                <Comments
                    currentUserId="1"
                />
            </div>
        );
    }
}

export default App;
