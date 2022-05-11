import React, {Component} from 'react';
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../api";
import Pagination from "./Pagination";


class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backendComments : [],
            activeComments : null,
            page : 1,
            name : '',
            foundPosts : this.rootComments
        }
    }


    getReplies = (commentId) =>
        this.state.backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort((a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            this.setState({ backendComments : [comment, ...this.state.backendComments] })
            this.setState({ foundPosts : [comment, ...this.state.backendComments] })
            this.setState({ activeComment : null });
        });
    };

    updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = this.state.backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            this.setState({ backendComments : updatedBackendComments });
            this.setState({ foundPosts : updatedBackendComments });
            this.setState({ activeComment : null });
        });
    };

    deleteComment = (commentId) => {
        deleteCommentApi().then(() => {
            const updatedBackendComments = this.state.backendComments.filter(
                (backendComment) => backendComment.id !== commentId
            );
            this.setState({ backendComments : updatedBackendComments });
            this.setState({ foundPosts : updatedBackendComments });
        });
    };

    componentDidMount() {
        getCommentsApi().then((data) => {
            this.setState({ backendComments : data});
            this.setState({ foundPosts : data});
            this.rootComments = this.state.backendComments.filter((backendComment) => backendComment.parentId === null);

        });
    }

    filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = this.rootComments.filter((post) => {
                return post.body.toLowerCase().startsWith(keyword.toLowerCase());
            });
            this.setState({ foundPosts : results });
        } else {
            this.setState({ foundPosts : this.rootComments });
        }
        this.setState({ name : keyword });
    };



    render() {
        console.log('found posts ',this.state.foundPosts)
        return (
            <div className="comments">
                <h3 className="comments-title">Comments</h3>
                <div className="comment-form-title">Write comment</div>
                <CommentForm submitLabel="Write" handleSubmit={this.addComment} />
                <div className="comments-container">
                    <button className='sort-btn'>Sort</button>
                    <input
                        type="search"
                        value={this.state.name}
                        onChange={this.filter}
                        className="input"
                        placeholder="Filter"
                    />
                    {this.state.foundPosts && this.state.foundPosts.length > 0 ? (
                        this.state.foundPosts.slice(this.state.page*5-5,this.state.page*5).map((post) => (
                            <Comment
                                key={post.id}
                                comment={post}
                                replies={this.getReplies(post.id)}
                                activeComment={this.state.activeComment}
                                setActiveComment={(arg1,arg2)=>this.setState({activeComment:{id:arg1,type:arg2}})}
                                addComment={this.addComment}
                                deleteComment={this.deleteComment}
                                updateComment={this.updateComment}
                                currentUserId={this.props.currentUserId}
                                likes={post.likes}
                            />
                        ))
                    ) : (
                        <h1>No results found!</h1>
                    )}


                </div>
                <Pagination value={this.state.page} range={5} onChange={(n)=>this.setState({ page:n})} data={this.state.foundPosts} />
            </div>
        );
    }
}
Comments.defaultProps = {currentUserId:"1"}

export default Comments;

