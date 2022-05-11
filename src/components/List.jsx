import React, {Component} from 'react';
import {getComments as getCommentsApi, getComments} from "../api";
import Comment from "./Comment";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
        console.log(this.state.data)
    }

    componentDidMount() {
        getCommentsApi().then((data) => {
            this.setState({ data : data});
        });
    }

    render() {
        console.log('data ',this.state.data)
        return (
            <div className='list-block'>
                <div className='list'>
                    <h1>List 1</h1>
                    <div className='btn-block'>
                        <img src="./plus.png" alt="plus" className='plus-btn'/>
                        <img src="./minus.png" alt="minus" className='plus-btn'/>
                    </div>

                </div>
                <div className='list'>
                    <h1>List 2</h1>
                    <div className='btn-block'>
                        <img src="./plus.png" alt="plus" className='plus-btn'/>
                        <img src="./minus.png" alt="minus" className='plus-btn' onClick={()=>alert('jhgc')}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default List;
