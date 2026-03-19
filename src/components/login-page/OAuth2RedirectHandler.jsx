import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import './OAuth2Redirect.css';

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            try {
            
                Cookies.set('jwt_token', token, { expires: 7, secure: true, sameSite: 'strict' });
                
        
                const decoded = jwtDecode(token);
                const role = decoded.role;

                toast.success("Google Login Successful!");

                setTimeout(() => {
                    if (role === 'TRAVELER') navigate('/TravelerDashBoard', { replace: true });
                    else if (role === 'AGENCY') navigate('/AgencyDashBoard', { replace: true });
                    else if (role === 'ADMIN') navigate('/AdminDashBoard', { replace: true });
                    else navigate('/', { replace: true });
                }, 1000);

            } catch (err) {
                toast.error("Authentication Failed!");
                navigate('/login', { replace: true });
            }
        } else {
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="google-redirect-blank-page">
            <div className="top-loading-bar"></div>
        </div>
    );
};

export default OAuth2RedirectHandler;