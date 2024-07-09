/* eslint-disable react/prop-types */
import  { useState } from 'react';
import axios from 'axios';
import './replyForm.scss';

function ReplyForm({ complaint, onClose }) {
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/http://localhost:5000/complaints/${complaint._id}`, {
                status: 'In Progress',
                feedback: response
            });
            onClose();
        } catch (error) {
            console.error('Error replying to complaint:', error);
        }
    };

    return (
        <div className="replyForm">
           
            <form onSubmit={handleSubmit}>
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here" />
                <button type="submit">Send Reply</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default ReplyForm;