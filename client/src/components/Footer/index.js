import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <footer className="PH">
            <div className="PH">
                {location.pathname !== '/' && (
                    <button 
                    className = "PH"
                    onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                )}
                <h4>
                    Hop back on Commander!
                </h4>
            </div>

        </footer>
    )
}