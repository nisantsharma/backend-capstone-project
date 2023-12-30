import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import styled from './JobList.module.css';

import image1 from '../../assest/image1.png';
import image2 from '../../assest/image2.png';
import image3 from '../../assest/image3.png';
import searchImage from '../../assest/search.png';
import peopleImage from '../../assest/people.png';
import rupeeImage from '../../assest/rupees.png';
import indianFlagImage from '../../assest/indianflag.png';

import { BACKEND_URL } from '../../constants/constant';



const SkillCardSelected = ({ item, selectedSkill, setSelectedSkill }) => {
    const crossHandler = (e) => {
        const arr = selectedSkill.filter((skill) => {
            return skill !== item;
        });

        setSelectedSkill([...arr]);
    }


    return (
        <div style={{ height: '30px', backgroundColor: '#FFEEEE', borderRadius: '5px', display: 'flex', marginRight: '20px', marginBottom: '10px', fontSize: '20px', cursor: 'pointer' }}>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px' }}>{item}</p>
            <p onClick={crossHandler} style={{ width: '40px', backgroundColor: '#FF6B6B', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>X</p>
        </div>
    )
};


const SkillCardRequired = ({ skill }) => {
    return (
        <div style={{ height: '30px', backgroundColor: '#FFEEEE', borderRadius: '5px', display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '10px', fontSize: '17px', padding: '0px 20px' }}>
            {skill}
        </div>
    )
};



const JobCard = ({ item, setJob }) => {

    const navigate = useNavigate();



    const user = localStorage.getItem('user');

    const editjobHandler = () => {
        setJob(item);
        navigate('/editjob');
    }


    const viewdetailsHandler = () => {
        setJob(item);
        navigate('/jobdetails');
    }



    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                padding: '15px 30px',
                boxShadow: '0px 0px 22px 2px #FF202040',
                marginBottom: '20px'
            }}>
            <div style={{ display: 'flex', width: '55%' }}>
                <img width='40px' height='40px' style={{ marginRight: '25px', marginTop: '5px' }} src={item.logoUrl} alt='random images' />
                <div>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{item.jobPosition}</p>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#9C9C9C', marginBottom: '20px' }}>
                        <img src={peopleImage} width='15px' height='13px' style={{ marginRight: '10px' }} alt='people image' />
                        <p style={{ marginRight: '20px' }}>11-50</p>

                        <img src={rupeeImage} width='8px' height='13px' style={{ marginRight: '8px' }} alt='rupee image' />
                        <p style={{ marginRight: '25px', fontSize: '17px' }}>{item.monthlySalary}</p>

                        <img src={indianFlagImage} width='35px' height='35px' style={{ marginRight: '10px' }} alt='indian flag image' />
                        <p>{item.location}</p>
                    </div>
                    <div
                        style={{
                            width: '60%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#ED5353',
                            fontWeight: 'bold'
                        }}>
                        <p>{item.remoteOffice}</p>
                        <p>{item.jobType}</p>
                    </div>
                </div>
            </div>
            <div style={{ width: '40%', marginLeft: '15px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        height: '70px',
                        overflowY: 'auto',
                        marginBottom: '15px'
                    }}>
                    {
                        item.skillsRequired.map((skill, ind) => {
                            return (
                                <SkillCardRequired key={ind} skill={skill} />
                            )
                        })
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        user ? (
                            <div
                                onClick={editjobHandler}
                                style={{
                                    width: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '30px',
                                    border: '2px solid #ED5353',
                                    color: '#ED5353',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '15px'
                                }}>
                                Edit Job
                            </div>
                        ) : (
                            <></>
                        )
                    }

                    <div
                        onClick={viewdetailsHandler}
                        style={{
                            width: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ED5353',
                            color: 'white',
                            height: '30px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                        View details
                    </div>
                </div>
            </div>
        </div>
    )
}


const JobList = ({ setJob }) => {

    const [user, setUser] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [skillArr, setSkillArr] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [jobArr, setJobArr] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    useEffect(() => {
        fetchSkill();
    }, []);

    useEffect(() => {
        getAllJobs();
    }, []);



    const fetchSkill = async () => {
        const allSkills = await axios.get(`${BACKEND_URL}/api/skill/getSkill`);
        const arr = allSkills.data.data;

        // console.log(arr, typeof arr, Array.isArray(arr));

        setSkillArr(arr);

        localStorage.setItem('allSkills', JSON.stringify(arr));
    }


    const loginHandler = () => {
        navigate('/login');
    }

    const registerHandler = () => {
        navigate('/register');
    }

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    const inputHandler = (e) => {
        setJobTitle(e.target.value);
    }

    const selectHandler = (e) => {
        if (e.target.value) {
            const arr = selectedSkill.filter((item) => {
                return item !== e.target.value;
            });

            setSelectedSkill([...arr, e.target.value]);
        }
        // console.log(e.target.value, selectedSkill);
    }

    const clearHandler = () => {
        setSelectedSkill([]);
    }

    const addjobHandler = () => {
        navigate('/addjob');
    }


    const buttonHandler = (e) => {
        if (e.key === 'Enter') {
            // console.log(jobTitle);
            // console.log(selectedSkill);

            getFilteredJobs();
        }
    }


    const getFilteredJobs = async () => {
        try {
            let str = '';

            if (selectedSkill.length) {
                str = selectedSkill.join(',');
            }

            // console.log(str);

            const res = await axios.get(`${BACKEND_URL}/api/job/filterJob?jobTitle=${jobTitle}&skills=${str}`);
            // console.log(res.data);

            const arr = res.data.data;

            // console.log(arr);

            setJobArr(arr);
        }
        catch (err) {
            if (err.response && err.response.status === 404) {
                setJobArr([]);
            }

            console.log(err);
            console.log(err.message);
        }
    }


    const getAllJobs = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/job/getAllJobs`);
            const arr = res.data.data;

            // console.log(arr);

            setJobArr(arr);
        }
        catch (err) {
            console.log(err.message);
        }
    }



    return (
        <div className={styled.div1}>
            <div className={styled.div2}>
                <img className={styled.img1} src={image1} alt='image1' />
                <img className={styled.img2} height='70%' src={image2} alt='image2' />
                <img className={styled.img3} src={image3} alt='image3' />
                <p className={styled.p1}>Jobfinder</p>

                {
                    user ? (
                        <div className={styled.div24}>
                            <div className={styled.div25} onClick={logoutHandler}>Logout</div>
                            <div className={styled.div26}>Hello! {user?.name}</div>
                            <div className={styled.div27}></div>
                        </div>
                    ) : (
                        <div className={styled.div21}>
                            <div className={styled.div22} onClick={loginHandler}>Login</div>
                            <div className={styled.div23} onClick={registerHandler}>Register</div>
                        </div>
                    )
                }
            </div>

            <div className={styled.div3}>
                <div className={styled.div4}>
                    <div className={styled.div41}>
                        <img className={styled.image4} src={searchImage} alt='search icon' />
                        <input onChange={inputHandler} onKeyDown={buttonHandler} className={styled.input1} type='text' placeholder='Type any job title' />
                    </div>
                    <div className={styled.div42}>
                        <div className={styled.div43}>
                            <select style={{
                                border: '2px solid #CECECE',
                                outline: 'none',
                                width: '100px',
                                height: '40px',
                                fontSize: '20px',
                                borderRadius: '5px',
                                padding: '5px 10px'
                            }}
                                onChange={selectHandler}
                            >
                                <option value="">Skills</option>

                                {
                                    skillArr.map((item, ind) => {
                                        return (
                                            <option key={ind} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div style={{ width: '75%' }}>
                            <div className={styled.div44}>
                                {
                                    selectedSkill.map((item, ind) => {
                                        return (
                                            <SkillCardSelected key={ind} item={item} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
                                        )
                                    })
                                }

                            </div>
                            {
                                user ? (
                                    <div
                                        onClick={clearHandler}
                                        style={{
                                            width: '60px',
                                            height: '40px',
                                            color: '#ED5353',
                                            cursor: 'pointer',
                                            marginLeft: '40px',
                                            marginTop: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '600',
                                            position: 'relative',
                                            left: '550px'
                                        }}>
                                        Clear
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>

                        <div style={{ display: 'flex', width: '15%', marginLeft: '15px', justifyContent: 'flex-end' }}>
                            {
                                user ? (
                                    <></>
                                ) : (
                                    <div onClick={clearHandler} className={styled.div45}>
                                        Clear
                                    </div>
                                )
                            }

                            {
                                user ? (
                                    <div
                                        onClick={addjobHandler}
                                        style={{
                                            width: '110px',
                                            height: '35px',
                                            backgroundColor: '#ED5353',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginLeft: '30px'
                                        }}>
                                        + Add Job
                                    </div>
                                ) : (
                                    <></>
                                )
                            }

                        </div>

                    </div>
                </div>
                <div className={styled.div5}>
                    {
                        jobArr.map((item, ind) => {
                            return (
                                <JobCard key={ind} item={item} setJob={setJob} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default JobList;