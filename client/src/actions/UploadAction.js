import * as upLoadApi from "../API/UpLoadRequest"
export const upLoadImg = (data) => async (dispatch) => {
  try {
    await upLoadApi.upLoadImg(data)
  } catch (error) {
    console.log(error)
  }
}

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
 
  try {
    const newPost = await upLoadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


