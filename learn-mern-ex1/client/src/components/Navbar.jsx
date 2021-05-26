import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'


const AppNavbar = () => {

    // # Call reducer
    const { isAuthenticated, user } = useSelector(state => state.auth)

    // # State
    const [open, setOpen] = useState(false)

    // # Toggle menu
    const toggle = () => setOpen(!open)


    // todo: Login or not ?
    // # Logged in
    const loggedIn = (
        <>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>
                        {
                            user
                                ? `Wellcome ${user.name}`
                                : null
                        }
                    </strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    )

    // # Not loging in
    const guest = (
        <>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </>
    )

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={open} navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                isAuthenticated
                                    ? loggedIn
                                    : guest
                            }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar
