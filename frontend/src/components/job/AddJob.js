import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


import jobPageImage from '../../assest/jobpage.png';

import { BACKEND_URL } from '../../constants/constant';



const AddJob = ({ job }) => {

    const [obj, setObj] = useState({
        companyName: job?.companyName,
        logoUrl: job?.logoUrl,
        jobPosition: job?.jobPosition,
        monthlySalary: job?.monthlySalary,
        jobType: job?.jobType,
        remoteOffice: job?.remoteOffice,
        location: job?.location,
        jobDescription: job?.jobDescription,
        aboutCompany: job?.aboutCompany,
        information: job?.information,
        skillsRequired: job?.skillsRequired.join(',')
    });

    // console.log(job);

    const navigate = useNavigate();

    const location = useLocation();

    const currentUrl = location.pathname;

    const edit = currentUrl.includes('/editjob');



    const inputHandler = (e) => {
        setObj({
            ...obj, [e.target.name]: e.target.value
        })

        // console.log(obj);
        // console.log(e.target.name);
        // console.log(e.target.value);
    }


    const addjobHandler = async () => {
        try {
            const { token } = JSON.parse(localStorage.getItem('user'));

            await axios.post(`${BACKEND_URL}/api/job/create`, obj, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            navigate('/');
        }
        catch (err) {
            console.log(err.message);
        }
    }


    const editjobHandler = async () => {
        try {
            const { token } = JSON.parse(localStorage.getItem('user'));

            await axios.put(`${BACKEND_URL}/api/job/update/${job?._id}`, obj, {
                headers: {
                    'Authorization': `${token}`
                }
            });

            navigate('/');
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const buttonHandler = () => {

        // console.log(job);
        // console.log(job._id);

        if (edit) {
            editjobHandler();
        }
        else {
            addjobHandler();
        }

        // console.log(location);
        // console.log(currentUrl);
    }



    return (
        <div style={{ display: 'flex' }}>
            <div style={{
                width: '50%',
                padding: '30px 70px',
            }}>
                <p style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>Add job description</p>

                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='companyName' style={{ fontWeight: 'bold' }}>Company Name</label>
                    <input id='companyName'
                        onChange={inputHandler}
                        name='companyName'
                        value={obj.companyName}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter your company name here' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='logoURL' style={{ fontWeight: 'bold' }}>Add logo URL</label>
                    <input id='logoURL'
                        name='logoUrl'
                        onChange={inputHandler}
                        value={obj.logoUrl}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter the link' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='jobPosition' style={{ fontWeight: 'bold' }}>Job position</label>
                    <input id='jobPosition'
                        name='jobPosition'
                        onChange={inputHandler}
                        value={obj.jobPosition}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter job position' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='salary' style={{ fontWeight: 'bold' }}>Monthly salary</label>
                    <input id='salary'
                        name='monthlySalary'
                        onChange={inputHandler}
                        value={obj.monthlySalary}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter Amount in rupees' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label style={{
                        fontWeight: 'bold',
                        marginRight: '105px'
                    }}>Job Type</label>
                    <select
                        name='jobType'
                        onChange={inputHandler}
                        value={obj.jobType}
                        style={{
                            width: '100px',
                            height: '35px',
                            fontSize: '17px',
                            outline: 'none',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px'
                        }}>
                        <option value=''>Select</option>
                        <option value='Full-time'>Full-time</option>
                        <option value='Part-time'>Part-time</option>
                    </select>
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label style={{
                        fontWeight: 'bold',
                        marginRight: '70px'
                    }}>Remote/office</label>
                    <select
                        name='remoteOffice'
                        onChange={inputHandler}
                        value={obj.remoteOffice}
                        style={{
                            width: '100px',
                            height: '35px',
                            fontSize: '17px',
                            outline: 'none',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px'
                        }}>
                        <option value=''>Select</option>
                        <option value='Remote'>Remote</option>
                        <option value='Office'>Office</option>
                    </select>
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='location' style={{ fontWeight: 'bold' }}>Location</label>
                    <input id='location'
                        name='location'
                        onChange={inputHandler}
                        value={obj.location}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter Location' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='jobDescription' style={{ fontWeight: 'bold' }}>Job Description</label>
                    <textarea id='jobDescription'
                        name='jobDescription'
                        onChange={inputHandler}
                        value={obj.jobDescription}
                        style={{
                            width: '70%',
                            height: '80px',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px',
                            resize: 'none'
                        }} placeholder='Type the job description' />
                </div>

                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='aboutCompany' style={{ fontWeight: 'bold' }}>About Company</label>
                    <textarea id='aboutCompany'
                        name='aboutCompany'
                        onChange={inputHandler}
                        value={obj.aboutCompany}
                        style={{
                            width: '70%',
                            height: '80px',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px',
                            resize: 'none'
                        }} placeholder='Type about your company' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='skillsRequired' style={{ fontWeight: 'bold' }}>Skills Required</label>
                    <input id='skillsRequired'
                        name='skillsRequired'
                        onChange={inputHandler}
                        value={obj.skillsRequired}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter the must have skills' />
                </div>
                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <label htmlFor='information' style={{ fontWeight: 'bold' }}>Information</label>
                    <input id='information'
                        name='information'
                        onChange={inputHandler}
                        value={obj.information}
                        style={{
                            width: '70%',
                            border: '2px solid #ADADAD',
                            borderRadius: '2px',
                            padding: '5px 15px',
                            outline: 'none',
                            fontSize: '17px'
                        }} placeholder='Enter the additional information' />
                </div>

                <div style={{
                    width: '92%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <div style={{
                        width: '110px',
                        height: '35px',
                        color: '#CECECE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        border: '2px solid #CECECE',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>Cancel</div>
                    {
                        edit ? (
                            <div
                                onClick={buttonHandler}
                                style={{
                                    width: '110px',
                                    height: '35px',
                                    backgroundColor: '#ED5353',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                + Edit Job
                            </div>
                        ) : (
                            <div
                                onClick={buttonHandler}
                                style={{
                                    width: '110px',
                                    height: '35px',
                                    backgroundColor: '#ED5353',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                + Add Job
                            </div>
                        )
                    }

                </div>
            </div>
            <div style={{
                width: '50%',
                height: '99vh',
                position: 'relative'
            }}>
                <p style={{
                    color: 'white',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    position: 'absolute',
                    left: '200px',
                    top: '50px'
                }}>Recruiter add job details here
                </p>
                <img width='100%' height='100%' src={jobPageImage} alt='job page' />
            </div>
        </div>
    )
}

export default AddJob;