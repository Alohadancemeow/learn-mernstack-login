import React from 'react'
import { logout } from '../../redux/actions/authAction'
import { NavLink } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'


const Logout = () => {

    const dispatch = useDispatch()

    // todo: logout


    // # Logout
    const handleLogout = () => {
        dispatch(logout())         
    }

    return (
        <>
            <NavLink href="#" onClick={handleLogout}>
                Logout
            </NavLink>
        </>
    )
}

export default Logout
