import * as UserApi from "../API/UserRequest"


export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({ type: "UPLOAD_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "UPLOAD_FAIL" });
    }
};

export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER" });
    await UserApi.followUser(id, data);
};
export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER" });
    await UserApi.unFollowUser(id, data);
};
