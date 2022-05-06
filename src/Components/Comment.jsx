import CommentForm from "./CommentForm";
import {useState} from "react";



const Comment = ({
                     comment,
                     replies,
                     setActiveComment,
                     activeComment,
                     updateComment,
                     deleteComment,
                     addComment,
                     parentId = null,
                     currentUserId,
                     likes=0
                 }) => {
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.userId && !timePassed;
    const replyId = parentId ? parentId : comment.id;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const [like,setLike] = useState(likes);
    const handleLike = () => {
        setLike((prev) => prev + 1);
    };

    return (
        <div key={comment.id} className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>
                {!isEditing && <div className="comment-text">{comment.body}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}

                <div className="comment-actions">
                    <div className={like<3?'red-like':like===3?'yellow-like':'green-like'}>{like}</div>
                    <div
                        className="comment-action"
                        onClick={handleLike}
                    >
                        <img className='icon' src="/like.png" alt="like"/>
                    </div>
                    {canReply && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ id: comment.id, type: "replying" })}
                        >
                            <img className='icon' src="/comment.png" alt="reply"/>
                        </div>
                    )}
                    {canEdit && (
                        <div
                            className="comment-action"
                            onClick={() => setActiveComment({ id: comment.id, type: "editing" })}
                        >
                            <img className='icon' src="/edit.svg" alt="reply"/>
                        </div>
                    )}
                    {canDelete && (
                        <div
                            className="comment-action"
                            onClick={() => deleteComment(comment.id)}
                        >
                            <img className='icon' src="/delete.png" alt="delete"/>
                        </div>
                    )}
                </div>
                {isReplying && (
                    <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                parentId={comment.id}
                                replies={[]}
                                currentUserId={currentUserId}
                                likes={reply.likes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
