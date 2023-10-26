import React from 'react'
import { useState } from 'react'
import "./index.css"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth , provider} from '../../firebase'
import { useHistory } from 'react-router-dom'

function Index() {
    const [register, setRegister] = useState(false)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[username,setUsername]=useState("")
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const history=useHistory()


    function validateEmail(email) {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) === false) {
          return false;
        } else return true;
      }

    const handleSignInGoogle=()=>{
        setLoading(true);
        signInWithPopup(auth,provider).then((res)=>{
            history.push("/")
            setLoading(false)
            console.log(res);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
          });
      };
    


    const handleRegister=()=>{
        // e.preventDeault()
        setError("")
        setLoading(false)
        if(email===""||password===""||username===""){
            setError("Required field is missing")
            setLoading(false)
        } else{
            createUserWithEmailAndPassword(auth,email,password).then((res)=>{
                setLoading(false)
                history.push("/")
                console.log(res)
            }).catch((err)=>{
                console.log(err);
                setError(err.message)
                setLoading(false)
            })
        }
    }

    const handelSignIn=()=>{
        // e.preventDefault()
        setError("")
        setLoading(true)
        if(email===""||password===""){
            setError("Required field is missing")
            setLoading(false)
        }else if (!validateEmail(email)) {
            setError("Email is malformed");
            setLoading(false);
        }else{
            signInWithEmailAndPassword(auth,email,password).then((res)=>{
                console.log(res)
                history.push("/")
                setLoading(false)
            }).catch((err)=>{
                console.log(err.code)
                setError(error.message)
                setLoading(false);
            })
        }
    }

    return (
        <div className='auth'>
            <div className="auth-container">
                <p>Add another way to log in using any of the following services.</p>
                <div className="sign-options">
                    <div onClick={handleSignInGoogle} className="single-option">
                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-logos-vector-eps-cdr-svg-download-10.png" alt="google" />
                        <p>Login with Google</p>
                    </div>
                </div>
                <div className="auth-login">
                    <div className="auth-login-container">
                        {
                            register ? (<>
                                <div className="input-field">
                                    <p>Username</p>
                                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" />
                                </div>
                                <div className="input-field">
                                    <p>Email</p>
                                    <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
                                </div>
                                <div className="input-field">
                                    <p>Password</p>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" />
                                </div>
                                <button onClick={handleRegister} disabled={loading} style={{
                                    marginTop: "20px",
                                }}>{loading?"Registering...":"Register"}</button>
                            </>) : (<>
                                <div className="input-field">
                                    <p>Email</p>
                                    <input onChange={(e)=>setEmail(e.target.value)} type="email" />
                                </div>
                                <div className="input-field">
                                    <p>Password</p>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
                                </div>
                                <button onClick={handelSignIn} disabled={loading} style={{
                                    marginTop: "20px",
                                }}> {loading?"Signing In...":"Login"} </button>
                            </>)
                        }
                        <p onClick={()=>setRegister(!register)}
                        style={{
                            marginTop: "10px",
                            textAlign: "center",
                            color: "#0095ff",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}>{register ? "Login" : "Register"}?</p>
                    </div>
                </div>
                {error !== "" && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
            </div>
        </div>
    )
}

export default Index