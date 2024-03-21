import * as AuthApi from "../API/AuthRequest"

export const logIn = (formData) => async (dispatch) => {
   dispatch({type:"AUTH_START"})
    try {
        const { data } = await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS",data:data})
        console.log("user login ....")
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({type:"AUTH_START"})
     try {
         const { data } = await AuthApi.signUp(formData)
         dispatch({type:"AUTH_SUCCESS",data:data})
        console.log("user signup ....")

     } catch (error) {
         console.log(error)
         dispatch({type:"AUTH_FAIL"})
     }
 }

 export const logOut=()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
 }