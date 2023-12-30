import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



import styled from './Signup.module.css';
import loginImage from '../../assest/loginPage.png';
import conditionImage from '../../assest/tick.png';


import { BACKEND_URL } from '../../constants/constant';



const Signup = () => {

    const [obj, setObj] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });

    const navigate = useNavigate();



    const inputHandler = (e) => {
        setObj({
            ...obj, [e.target.name]: e.target.value
        })
    }


    const signInHandler = () => {
        navigate('/login');
        return;
    }


    const signUpHandler = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/user/register`, obj);
            const data = res.data;
            localStorage.setItem('user', JSON.stringify({ ...data.data }));

            navigate('/');

            // console.log(data);
            // console.log(res);
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




    return (
        <div className={styled.div1}>
            <div className={styled.div2}>
                <div className={styled.div21}>
                    <p className={styled.p1}>Create an account</p>
                    <p className={styled.p2}>Your personal job finder is here</p>
                    <input onChange={inputHandler} type='text' name='name' placeholder='Name' className={styled.input1} />
                    <input onChange={inputHandler} type='text' name='email' placeholder='Email' className={styled.input1} />
                    <input onChange={inputHandler} type='text' name='mobile' placeholder='Mobile' className={styled.input1} />
                    <input onChange={inputHandler} type='text' name='password' placeholder='Password' className={styled.input1} />
                    <div className={styled.div211}>
                        <img width='20px' height='20px' src={conditionImage} alt='terms and condiion' />
                        <p className={styled.p21}>By creating an account, I agree to our terms of use and privacy policy</p>
                    </div>
                    <div className={styled.div22} onClick={signUpHandler}>Create Account</div>
                    <p className={styled.p3}>Already have an account? <span className={styled.span1} onClick={signInHandler}>Sign In</span> </p>
                </div>
            </div>
            <div className={styled.div3}>
                <p className={styled.p4}>Your Personal Job Finder</p>
                <img width='100%' height='100%' src={loginImage} alt='login page' />
            </div>
        </div>
    )
}

export default Signup;