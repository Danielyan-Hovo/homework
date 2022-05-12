export const getComments = async () => {
    return [
        {
            id: "1",
            body: "First comment",
            username: "Jack",
            userId: "1",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes : 6
        },
        {
            id: "2",
            body: "Second comment",
            username: "John",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 3
        },
        {
            id: "3",
            body: "First comment first child",
            username: "John",
            userId: "2",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 7
        },
        {
            id: "4",
            body: "Second comment second child",
            username: "John",
            userId: "2",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "5",
            body: "wonderfully",
            username: "John",
            userId: "2",
            parentId: "8",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "6",
            body: "Do you speak English?",
            username: "Carol",
            userId: "4",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "7",
            body: "Second comment second child",
            username: "John",
            userId: "2",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "8",
            body: "hey i'm  here!!!",
            username: "Karen",
            userId: "3",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "9",
            body: "First comment",
            username: "Sara",
            userId: "5",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes : 6
        },
        {
            id: "10",
            body: "Lorem Ipsum",
            username: "John",
            userId: "2",
            parentId: "9",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 3
        },
        {
            id: "11",
            body: "The best",
            username: "Frank",
            userId: "7",
            parentId: "9",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 7
        },
        {
            id: "12",
            body: "Second comment second child",
            username: "John",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "13",
            body: "wonderfully",
            username: "John",
            userId: "2",
            parentId: "8",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "14",
            body: "Do you speak English?",
            username: "Carol",
            userId: "4",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 13
        },
        {
            id: "15",
            body: "Second comment second child",
            username: "John",
            userId: "2",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 5
        },
        {
            id: "16",
            body: "hey i'm  here!!!",
            username: "Karen",
            userId: "3",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            likes: 16
        },
    ];
};

export const createComment = async (text, parentId = null) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId,
        userId: "1",
        username: "John",
        createdAt: new Date().toISOString(),
        likes : 0
    };
};

export const likeComment = async (commentId) => {
    return commentId;
}

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};
