import { useEffect } from 'react';
import { useToast } from './toaster';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    const navigate = useNavigate();
    const setToastData = useToast();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
            setToastData({ color: 'red', message: 'You are not Authenticated' });
        }
    }, [isLoggedIn, navigate, setToastData]);

    if (isLoggedIn) {
        return children;
    } else {
        return null;
    }
};

export default ProtectedRoute;
