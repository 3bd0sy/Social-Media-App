import React, { useState } from 'react'
import "./Auth.css"
import Logo from "../../images/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { logIn, signUp } from '../../actions/AuthActions'
const Auth = () => {
    const dispatch = useDispatch()
    const loading=useSelector((state)=>state.authReducer.loading)
  
    const [isSingedUp, setIsSingedUp] = useState(!false)
    const [formData, setFormdata] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: ""
    })
    const [confirmPass, setConfirmPass] = useState(!true)
    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSingedUp) {
            if (formData.password === formData.confirmpass) {
                dispatch(signUp(formData))
            } else {
                setConfirmPass(true)
            }
        }else{
            dispatch(logIn(formData))
        }
    }
    const resetForm = () => {
        setConfirmPass(false)
        setFormdata({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: ""
        })
    }
    return (
        <div className='auth'>
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="webname">
                    <h1>ABDO Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>
            {/* <SignUp /> */}
            {/* <LogIn/> */}
            {/*right side*/}

            <div className="a-right">
                <form action="" onSubmit={handleSubmit} className="infoForm authForm">
                    <h3>{isSingedUp ? "Sign Up" : "Log In"}</h3>

                    {isSingedUp &&
                        <div>
                            <input value={formData.firstname} onChange={handleChange} type="text" name='firstname' placeholder='First Name' className='infoInput' />
                            <input value={formData.lastname} onChange={handleChange} type="text" name='lastname' placeholder='Last Name' className='infoInput' />
                        </div>
                    }

                    <div>
                        <input value={formData.username} onChange={handleChange} type="text" name='username' placeholder='username' className='infoInput' />
                    </div>

                    <div>
                        <input value={formData.password} id="password" onChange={handleChange} type="password" name="password" placeholder="Password" className='infoInput'  />
                        {isSingedUp &&
                            <input value={formData.confirmpass} id="confirmpass" onChange={handleChange} type="password" name="confirmpass" placeholder="ConfirmPass" className='infoInput' />
                        }
                    </div>
                    {confirmPass &&
                        <span style={{ padding: "10px", backgroundColor: "#f44336", color: "white", borderRadius: "10px" }} >  <strong>alert!</strong> Confirm Password is not same !!!</span>
                    }
                    <div style={{ cursor: "pointer" }} onClick={() => { setIsSingedUp(!isSingedUp); resetForm() }}>
                        {isSingedUp ?
                            <span>Already have an account. <span className='log-text'>Login!</span> </span> :
                            <span>Don't have an account. <span className='log-text'>SignUp!</span> </span>
                        }
                    </div>

                    <button disabled={loading} className='button auth-btn'>{loading?"loading....":isSingedUp ? "SignUp" : "Login"}</button>

                </form>
            </div>
        </div>
    )
}

// function LogIn() {
//     return (
//         <div className="a-right">
//             <form action="" className="infoForm authForm">
//                 <h3>LogIn</h3>

//                 <div>
//                     <input type="text" placeholder='username' className='infoInput' />
//                 </div>

//                 <div>
//                     <input type="password" name="password" placeholder="Password" className='infoInput' id="" />
//                 </div>

//                 <div>
//                     <span>Don't have an account. <span className='log-text'>SignUp!</span> </span>
//                 </div>

//                 <button className='button auth-btn'>LogIn</button>

//             </form>
//         </div>
//     )
// }

// function SignUp() {
//     return (
//         <div className="a-right">
//             <form action="" className="infoForm authForm">
//                 <h3>SignUp</h3>

//                 <div>
//                     <input type="text" name='firstname' placeholder='First Name' className='infoInput' />
//                     <input type="text" name='lastname' placeholder='Last Name' className='infoInput' />
//                 </div>

//                 <div>
//                     <input type="text" placeholder='username' className='infoInput' />
//                 </div>

//                 <div>
//                     <input type="password" name="password" placeholder="Password" className='infoInput' id="" />
//                     <input type="password" name="confirmpass" placeholder="ConfirmPass" className='infoInput' id="" />
//                 </div>


//                 <div>
//                     <span>Already have an account. <span className='log-text'>Login!</span> </span>
//                 </div>


//                 <button className='button auth-btn'>SignUp</button>

//             </form>
//         </div>
//     )
// }

export default Auth