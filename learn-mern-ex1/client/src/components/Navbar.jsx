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

const AppNavbar = (props) => {

    // # State
    const [open, setOpen] = useState(false)

    // # Toggle menu
    const toggle = () => setOpen(!open)

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={open} navbar>
                        <Nav className="ml-auto" navbar >
                            <NavItem>
                                {/* <NavLink href="https://github.com">Github</NavLink> */}
                                <RegisterModal />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar
