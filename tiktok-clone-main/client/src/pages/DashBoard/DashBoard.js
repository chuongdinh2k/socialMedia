//Thư viện externor trước(thư viện bên ngoài)
import { useLayoutEffect, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function DashBoard() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/admin/dashboard/manageAccount');
        return () => {
            // clean up
        };
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
}

export default DashBoard;
