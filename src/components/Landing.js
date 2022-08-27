import React, { useState , useEffect } from 'react';
import styles from "./landing.module.css"
import { Link , useParams , useNavigate} from "react-router-dom"
import axios from 'axios';

const Landing = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [ loading , setLoading ] = useState(true)
    const [ mainUser , setMainUser ] = useState({})

    useEffect(() => {
        if(document.cookie){
            let userName = document.cookie.split("=")[1] 
            login(userName , "" , "Cookie")
        }else if (Object.entries(params).length){
            const {name , password} = params
            login(name , password , "Params")
        }else{
            setLoading(false)
        }
    }, [params])
    
    const login = async (userName , password , type) => {
        try{
            const res = await axios.get("https://login-form-3-1b33b-default-rtdb.firebaseio.com/users.json")
            const allUsers = Object.entries(res.data)

            if(type === "Cookie"){
                let user = allUsers.find(user => user[1].name === userName)
                setMainUser({...user[1]})
            } else {
                let user = allUsers.find(user => (user[1].name === userName && user[1].password === password))
                setMainUser({...user[1]}) 
            }

            setLoading(false)
        }catch(err){
            alert("Sth went wrong :(")
            setLoading(false)
        }
    }

    const logOut = () => {
        let now = new Date()

        now.setTime(now.getTime() - 3 * 24 * 60 * 60 * 1000);

        document.cookie =  `name=${mainUser.name};path=/;expires=${now}`
                
        navigate("/")

        setMainUser({})
    }

    if(mainUser.name){
        return (
            <div className={styles.container}>
              {loading && <div className={styles.loader}></div>}
              <h3>Welcome {mainUser.name}</h3>
              <button onClick={logOut} className='mt-4'>logout</button>
            </div>
        )
    }else{
        return (        
            <div className={styles.container}>
                {loading && <div className={styles.loader}></div>}
                <Link to="/signup">login / Signup</Link>
            </div>
        )
    }
};

export default Landing;