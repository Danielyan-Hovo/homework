import React, {Component} from 'react';
import CommentForm from "./CommentForm";

const fiveMinutes = 300000;

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like : this.props.likes
        }
    }


    handleLike = () => {
        this.setState(prev=> ({like : prev.like + 1 }))
    };

    isEditing =
        this.props.activeComment &&
        this.props.activeComment.id === this.props.comment.id &&
        this.props.activeComment.type === "editing";
    isReplying =
        this.props.activeComment &&
        this.props.activeComment.id === this.props.comment.id &&
        this.props.activeComment.type === "replying";
    timePassed = new Date() - new Date(this.props.comment.createdAt) > fiveMinutes;
    canDelete =
        this.props.currentUserId === this.props.comment.userId && this.props.replies.length === 0 && !this.timePassed;
    canReply = Boolean(this.props.currentUserId);
    canEdit = this.props.currentUserId === this.props.comment.userId && !this.timePassed;
    replyId = this.props.parentId ? this.props.parentId : this.props.comment.id;
    createdAt = new Date(this.props.comment.createdAt).toLocaleDateString();


    render() {
        return (
            <div key={this.props.comment.id} className="comment">
                <div className="comment-image-container">
                    <img src="/user-icon.png" />
                </div>
                <div className="comment-right-part">
                    <div className="comment-content">
                        <div className="comment-author">{this.props.comment.username}</div>
                        <div>{this.createdAt}</div>
                    </div>
                    {!this.isEditing && <div className="comment-text">{this.props.comment.body}</div>}
                    {this.isEditing && (
                        <CommentForm
                            submitLabel="Update"
                            hasCancelButton
                            initialText={this.props.comment.body}
                            handleSubmit={(text) => this.props.updateComment(text, this.props.comment.id)}
                            handleCancel={() => {
                                this.props.setActiveComment(null);
                            }}
                        />
                    )}

                    <div className="comment-actions">
                        <div className={this.state.like<3?'red-like':this.state.like===3?'yellow-like':'green-like'}>{this.state.like}</div>
                        <div
                            className="comment-action"
                            onClick={this.handleLike}
                        >
                            <img className='icon' src="/like.png" alt="like"/>
                        </div>
                        {this.canReply && (
                            <div
                                className="comment-action"
                                onClick={()=>{this.props.setActiveComment(this.props.comment.id, "replying" )
                                console.log('replaying',this.isReplying)}}
                            >
                                <img className='icon' src="/comment.png" alt="reply"/>
                            </div>
                        )}
                        {this.canEdit && (
                            <div
                                className="comment-action"
                                onClick={() => this.props.setActiveComment({ id: this.props.comment.id, type: "editing" })}
                            >
                                <img className='icon' src="/edit.svg" alt="reply"/>
                            </div>
                        )}
                        {this.canDelete && (
                            <div
                                className="comment-action"
                                onClick={() => this.props.deleteComment(this.props.comment.id)}
                            >
                                <img className='icon' src="/delete.png" alt="delete"/>
                            </div>
                        )}
                    </div>
                    {this.isReplying && (
                        <CommentForm
                            submitLabel="Reply"
                            handleSubmit={(text) => this.props.addComment(text, this.replyId)}
                        />
                    )}
                    {this.props.replies.length > 0 && (
                        <div className="replies">
                            {this.props.replies.map((reply) => (
                                <Comment
                                    comment={reply}
                                    key={reply.id}
                                    setActiveComment={this.props.setActiveComment}
                                    activeComment={this.props.activeComment}
                                    updateComment={this.props.updateComment}
                                    deleteComment={this.props.deleteComment}
                                    addComment={this.props.addComment}
                                    parentId={this.props.comment.id}
                                    replies={[]}
                                    currentUserId={this.props.currentUserId}
                                    likes={reply.likes}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
Comment.defaultProps = {
    parentId : null,
    currentUserId : '1',
    likes : 0
}

export default Comment;



