import React, {Component} from 'react';
import data from '../Posts.json'
import '../App.css'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 2,
            count_2: 3,
            count_3: 6,
        };
    }
    handleClick = (count) => {
        this.setState((prevState, { count }) => ({
            count: prevState.count + 1
        }));
    };
    render() {
        return (
            <div>
                {data.map((item)=>(
                        <div className='post' key={item.id} >
                            <h3 className='post-name'>{item.title}</h3>
                            <h4>{item.body}</h4>
                            <div className='comment-block'>
                                <div className='comment'>1.{item.comment_1}<p className='count'>{this.state.count}<button onClick={this.handleClick(this.state.count_1)}>+</button></p></div>
                                <div className='comment'>2.{item.comment_2}<p className='count'>{this.state.count_2}<button>+</button></p></div>
                                <div className='comment'>3.{item.comment_3}<p className='count'>{this.state.count_3}<button>+</button></p></div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

export default Post;
