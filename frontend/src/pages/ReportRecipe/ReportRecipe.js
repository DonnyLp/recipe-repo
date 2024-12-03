import React from 'react';
import { Navbar }from '../../components/Navbar';
import { useState } from 'react';
import './ReportRecipe.scss';
import axios from 'axios';

const ReportRecipe = () => {
    const [reportText, setReportText] = useState('');
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const handleSubmit = async() => {
        // Send report to backend
        const report = {
            report_reason: reportText,
            status: 'pending',
            user_id: user._id,
        };

        try {
            const response = await axios.post('http://localhost:9000/reportRecipe', report);
            console.log('Report response:', response);
            alert('Report submitted successfully');
        } catch (error) {
            console.error('Error reporting recipe:', error);
        }
    }
    
    return (
        <>
          <Navbar />
            <div className="recipe-report-container">
                <h1>Reason for Report</h1>
                <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Please Provide any Additional Information..."
                    rows="10"
                    cols="40"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>  
        </>
    
    );
};

export default ReportRecipe;