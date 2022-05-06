import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {Pagination} from "./Pagination";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "../api";
import React from "react";



const Comments = ({ currentUserId }) => {

    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
    const [foundPosts, setFoundPosts] = useState(rootComments);

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            setBackendComments([comment, ...backendComments]);
            setFoundPosts([comment, ...backendComments])
            setActiveComment(null);
        });
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setFoundPosts(updatedBackendComments);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId) => {
        deleteCommentApi().then(() => {
            const updatedBackendComments = backendComments.filter(
                (backendComment) => backendComment.id !== commentId
            );
            setBackendComments(updatedBackendComments);
            setFoundPosts(updatedBackendComments);
        });
    };

    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComments(data);
            setFoundPosts(data);
        });
    }, []);


    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = rootComments.filter((post) => {
                return post.body.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundPosts(results);
        } else {
            setFoundPosts(rootComments);
        }
        setName(keyword);
    };

    return (

        <div className="comments">
            <h1 className="comments-title">Comments</h1>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            <div className="comments-container">
                <button className='sort-btn'>Sort</button>
                <input
                    type="search"
                    value={name}
                    onChange={filter}
                    className="input"
                    placeholder="Filter"
                />
                {foundPosts && foundPosts.length > 0 ? (
                    foundPosts.slice(page*5-5,page*5).map((post) => (
                        <Comment
                            key={post.id}
                            comment={post}
                            replies={getReplies(post.id)}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            currentUserId={currentUserId}
                            likes={post.likes}
                        />
                    ))
                ) : (
                    <h1>No results found!</h1>
                )}

            </div>
            <Pagination value={page} range={5} onChange={setPage} data={foundPosts}/>
        </div>
    );
};

export default Comments;
