const authReducer = (
    state = { authData: null, loading: false, error: false },
    action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false }
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, error: false, loading: false }
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true }
        case "UPLOAD_START":
            return { ...state, loading: true, error: false }
        case "UPLOAD_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, error: false, loading: false }
        case "UPLOAD_FAIL":
            return { ...state, loading: false, error: true }

        case "LOG_OUT":
            localStorage.clear()
            return { ...state, authData: null, loading: false, error: false }
        // case "FOLLOW_USER": 
        //     return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } }}
        // case "UNFOLLOW_USER":
        //     return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)] } }}
        case "FOLLOW_USER": 
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } }}
        case "UNFOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)] } }}



        default:
            return state
    }
}


export default authReducer