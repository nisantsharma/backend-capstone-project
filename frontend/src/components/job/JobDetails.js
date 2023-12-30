import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import styled from './JobDetails.module.css';
import image1 from '../../assest/image1.png';
import image2 from '../../assest/image2.png';
import image3 from '../../assest/image3.png';
import moneyfill from '../../assest/moneyfill.png';
import calender from '../../assest/calender.png';




const SkillCard = ({ skill }) => {
    return (
        <div style={{ height: '30px', borderRadius: '15px', backgroundColor: '#FFEEEE', color: '#595959', marginRight: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', padding: '0 15px' }}>
            {skill}
        </div>
    );
}



const JobDetails = ({ job }) => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('user'));
        setUser(res);
    }, [])


    const editjobHandler = () => {
        navigate('/editjob');
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
                            <div className={styled.div25}>Logout</div>
                            <div className={styled.div26}>Hello! {user.name}</div>
                            <div className={styled.div27}></div>
                        </div>
                    ) : (
                        <div className={styled.div21}>
                            <div className={styled.div22}>Login</div>
                            <div className={styled.div23}>Register</div>
                        </div>
                    )
                }
            </div>

            <div className={styled.div3}>
                <div className={styled.div4}>
                    <p className={styled.p2}>{job?.jobDescription}</p>
                </div>

                <div className={styled.div5}>
                    <div style={{ display: 'flex', color: '#999999', marginBottom: '10px' }}>
                        <p style={{ marginRight: '20px' }}>1w ago</p>
                        <p style={{ marginRight: '20px' }}>{job?.jobType}</p>
                        <img style={{ marginRight: '20px' }} width='20px' height='20px' src={job?.logoUrl} alt='triangle' />
                        <p>{job?.companyName}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px' }}>{job?.jobPosition}</p>
                        {
                            user ? (
                                <div
                                    onClick={editjobHandler}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '30px',
                                        backgroundColor: '#ED5353',
                                        color: 'white',
                                        padding: '20px 25px',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>
                                    Edit job
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>

                    <p style={{ color: '#ED5353', fontWeight: 'bold', marginBottom: '30px' }}>
                        <span style={{ marginRight: '5px' }}>{job?.location}</span>
                        <span style={{ marginRight: '5px' }}>|</span>
                        <span>India</span>
                    </p>

                    <div style={{ display: 'flex', marginBottom: '40px' }}>
                        <div style={{ marginRight: '40px' }}>
                            <div
                                style={{
                                    color: '#999999',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '5px'
                                }}>
                                <img width='20px' height='20px' style={{ marginRight: '5px' }} src={moneyfill} alt='money' />
                                <span>Stipend</span>
                            </div>

                            <span>Rs {job?.monthlySalary}/month</span>
                        </div>

                        <div>
                            <div style={{ color: '#999999', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <img width='20px' height='17px' style={{ marginRight: '5px' }} src={calender} alt='money' />
                                <span>Duration</span>
                            </div>
                            <span>6 Months</span>
                        </div>
                    </div>

                    <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>About company</p>
                    <p style={{ textAlign: 'justify', marginBottom: '30px', lineHeight: '26px' }}>
                        {job?.aboutCompany}
                    </p>

                    <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>About the job/internship</p>
                    <p style={{ textAlign: 'justify', marginBottom: '30px', lineHeight: '26px' }}>
                        We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.

                        Selected intern's day-to-day responsibilities include:
                        1. Work on the development of theme customization, liquid programming language, and corresponding apps
                        2. Implement system integrations that are crucial to our success
                        3. Contribute to the development of HTML5/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences
                        4. Work on speed optimization and making a mobile-friendly website
                    </p>

                    <p style={{ fontWeight: 'bold', marginBottom: '25px' }}>Skill(s) required</p>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            maxHeight: '70px',
                            marginBottom: '30px',
                            overflowY: 'auto'
                        }}>
                        {
                            job?.skillsRequired.map((skill, ind) => {
                                return (
                                    <SkillCard key={ind} skill={skill} />
                                )
                            })
                        }
                    </div>

                    <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>Additional Information</p>
                    <p style={{ textAlign: 'justify', marginBottom: '20px', lineHeight: '26px' }}>
                        Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).
                    </p>
                </div>
            </div>
        </div>
    )
}



export default JobDetails;