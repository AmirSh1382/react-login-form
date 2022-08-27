import React , { useState , useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom'

import validate  from './validate'
import styles from "./Form.module.css"
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate()

    const [ data , setData ] = useState({
        name: "",
        password: "",
        isRemembered: false
    })
    const [ loading , setLoading ] = useState(false)
    const [ error , setError ] = useState({})
    const [ touch , setTouch ] = useState({})

    useEffect(() => {
        setError(validate(data , "Login"))
    }, [data , touch])

    const changeHandler = event => {
        if(event.target.name === "isRemembered"){
            setData({...data , [event.target.name]: event.target.checked })
        }else{
            setData({...data , [event.target.name]: event.target.value })
        }
    }

    const focusHandler = event => {
        setTouch({...touch , [event.target.name]: true })
    }

    const submithandler = async event => {
        event.preventDefault()

        if(Object.entries(error).length){
            setTouch({
                name: true,
                password: true,
            }) 
        }else{
            setLoading(true)

            try{
                const res = await axios.get("https://login-form-3-1b33b-default-rtdb.firebaseio.com/users.json")
                const allUsers = Object.entries(res.data)

                let mainUser = allUsers.find(user => {
                    return (user[1].name === data.name && user[1].password === data.password)
                })

                if(mainUser && data.isRemembered){
                    setCookie(mainUser[1])
                }else if(mainUser){
                    navigate(`/${mainUser[1].name}/${mainUser[1].password}/` , {replace : true})
                }else{
                    alert("Wrong Username or Password")
                }

                setLoading(false)
            }catch(err){
                alert("Sth went wrong :)")
                setLoading(false)
            }
        }
    }

    const setCookie = userInfo => {
        let now = new Date()

        now.setTime(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        document.cookie = `name=${userInfo.name};path=/;expires=${now}`
        navigate("/" , {replace : true})
    }

    return (
        <div className={styles.mainContainer}>
            <form className={styles.formContainer} onSubmit={submithandler}>
                <h3>Login</h3>

                {/* username input */}
                <div className={styles.inputHolder}>
                    <label>Username</label>
                    <input 
                        className={(error.name && touch.name) ? styles.uncompleted : styles.completed}
                        type="text" 
                        name='name' 
                        value={data.name} 
                        onFocus={focusHandler}
                        onChange={changeHandler}/>
                    {error.name && touch.name && <span>{error.name}</span>}
                </div>

                {/* password input */}
                <div className={styles.inputHolder}>
                    <label>Password</label>
                    <input
                        className={(error.password && touch.password) ? styles.uncompleted : styles.completed} 
                        type="password" 
                        name='password' 
                        value={data.password} 
                        onFocus={focusHandler}
                        onChange={changeHandler}/>
                    {error.password && touch.password && <span>{error.password}</span>}
                </div>

                {/* checkbox input */}
                <div className={styles.checkboxContainer}>
                    <div>
                        <label>Remember me</label>
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name="isRemembered"
                        onChange={changeHandler}
                        />
                    </div>
                </div>
                
                <div className={styles.btnContainer}>
                    <Link to="/signup">Sign up</Link>
                    <button className={loading ? styles.loading : ""} >Login</button>  
                </div>
            </form>
        </div>
    );
};

export default Signup;