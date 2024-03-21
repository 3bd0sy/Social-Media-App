const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        case "RETREIVING_START":
            return { ...state, uploading: true, error: false };
        case "RETREIVING_SUCCESS":
            const uniqueNewPosts = action.data.filter(
                (newPost) => !state.posts.some((post) => post._id === newPost._id)
            );
            return {
                ...state,
                posts: [...uniqueNewPosts, ...state.posts],
                error: false,
                uploading: false,
            };
        case "RETREIVING_FAIL":
            return { ...state, uploading: false, error: true };
        default:
            return state;
    }
};

export default postReducer;




// const postReducer = (
//     state = { posts: [], loading: false, error: false, uploading: false },
//     action) => {
//     switch (action.type) {
//         case "RETREIVING_START":
//             return { ...state, uploading: true, error: false }
//         case "RETREIVING_SUCCESS":
//             return { ...state, posts: [...action.data, ...state.posts], error: false, uploading: false }
//         case "RETREIVING_FAIL":
//             return { ...state, uploading: false, error: true }
//         default:
//             return state
//     }
// }
// export default postReducer