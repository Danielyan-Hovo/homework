import React, {Component} from 'react';
import { getComments } from "../api";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            firstPopular : {},
            secondPopular : {}
        }
    }

    handlerPlus = () =>{
        let arr = this.state.data.map((el)=>{
            return el.likes
        })
        let oldArr = this.state.data.map((el)=>{
            return el.likes
        })
        arr.sort((a, b)=>b-a)
        const popularId1 = oldArr.indexOf(arr[0]);
        const popularId2 = oldArr.lastIndexOf(arr[1]);
        this.setState({firstPopular : this.state.data[popularId1]});
        this.setState({secondPopular : this.state.data[popularId2]})
    }

    handlerMinus = (post) => {
        if(post==='first')
            this.setState({firstPopular : {}});
        else
            this.setState({secondPopular : {}});
    }

    componentDidMount() {
        getComments().then((data) => {
            this.setState({ data : data});
        });
    }

    render() {
        return (
            <div className='list-block'>
                <div className='list'>
                    <h1>List 1</h1>
                    <div className='btn-block'>
                        <img src="./plus.png" alt="plus" className='plus-btn' onClick={this.handlerPlus}/>
                        <img src="./minus.png" alt="minus" className='plus-btn' onClick={()=>this.handlerMinus('first')}/>
                    </div>
                    {this.state.firstPopular.body&&(
                        <div className='popular'>
                            <div className="comment-image-container">
                                <img src="/user-icon.png" />
                            </div>
                            <div className="comment-author">{this.state.firstPopular.username}</div>
                            <h3>{this.state.firstPopular.body}</h3>
                            <div className='likes'>
                                <h2 style={{marginTop:0}}>{this.state.firstPopular.likes}</h2>
                                <img src="/like-list.png" className='plus-btn' alt="like"/>
                            </div>
                        </div>
                    )}

                </div>
                <div className='list'>
                    <h1>List 2</h1>
                    <div className='btn-block'>
                        <img src="./plus.png" alt="plus" className='plus-btn' onClick={this.handlerPlus}/>
                        <img src="./minus.png" alt="minus" className='plus-btn' onClick={()=>this.handlerMinus('second')}/>
                    </div>
                    {this.state.secondPopular.body&&(
                        <div className='popular'>
                            <div className="comment-image-container">
                                <img src="/user-icon.png" />
                            </div>
                            <div className="comment-author">{this.state.secondPopular.username}</div>
                            <h3>{this.state.secondPopular.body}</h3>
                            <div className='likes'>
                                <h2 style={{marginTop:0}}>{this.state.secondPopular.likes}</h2>
                                <img src="/like-list.png" className='plus-btn' alt="like"/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default List;
