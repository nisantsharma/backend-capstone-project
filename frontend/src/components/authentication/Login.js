import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from './Login.module.css';
import loginImage from '../../assest/loginPage.png';

import { BACKEND_URL } from '../../constants/constant';




const Login = () => {

    const [obj, setObj] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();



    const inputHandler = (e) => {
        // console.log(e.target.name, e.target.value);

        setObj({
            ...obj, [e.target.name]: e.target.value
        })
    }


    const signInHandler = async () => {
        try {
            // console.log(url, obj);

            const res = await axios.post(`${BACKEND_URL}/api/user/login`, obj);
            const data = res.data;
            localStorage.setItem('user', JSON.stringify({ ...data.data }));
            navigate('/');

            // console.log(data);
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
            }
            else if (err.request) {
                console.log(err.request);
            }
            else {
                console.log(err.message);
            }
        }
    }


    const signUpHandler = () => {
        navigate('/register');
    }



    return (
        <div className={styled.div1}>
            <div className={styled.div2}>
                <div className={styled.div21}>
                    <p className={styled.p1}>Already have an account?</p>
                    <p className={styled.p2}>Your personal job finder is here</p>
                    <input name='email' onChange={inputHandler} type='text' placeholder='Email' className={styled.input1} />
                    <input name='password' onChange={inputHandler} type='text' placeholder='Password' className={styled.input1} />
                    <div className={styled.div22} onClick={signInHandler}>Sign in</div>
                    <p className={styled.p3}>Don't have an account? <span className={styled.span1} onClick={signUpHandler}>Sign Up</span> </p>
                </div>
            </div>
            <div className={styled.div3}>
                <p className={styled.p4}>Your Personal Job Finder</p>
                <img width='100%' height='100%' src={loginImage} alt='login page' />
            </div>
        </div>
    )
}

export default Login;