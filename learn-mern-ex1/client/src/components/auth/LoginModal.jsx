import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/authAction'
import { clearErrors } from '../../redux/actions/errorAction'
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    Modal,
    ModalBody,
    NavLink,
    Alert
} from 'reactstrap'

const LoginModal = () => {
    const dispatch = useDispatch()

    // # call Reducer
    const error = useSelector(state => state.error)
    console.log(error);
    const auth = useSelector(state => state.auth)
    console.log(auth);


    // # State
    const [user, setUser] = useState({
        modal: false,
        email: '',
        password: '',
        msg: null
    })


    // # Show from
    const toggle = () => {
        setUser({
            modal: !user.modal
        })

        // Clear error, after close modal
        dispatch(clearErrors())
    }

    // console.log(`OUT-> ${user.modal}`);


    const handleOnChange = (e) => {

        // console.log(e.target.value);
        // console.log(user.modal);

        setUser({
            ...user,
            modal: user.modal,
            [e.target.name]: e.target.value
        })

    }


    // todo: login
    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, password } = user
        const loginUser = {
            email,
            password
        }

        // Attempt to login
        dispatch(login(loginUser))
    }

    console.log(user);

    // # Error effect
    useEffect(() => {

        // Check for register error
        if (error.id === "LOGIN_FAIL") {
            return setUser({
                ...user,
                msg: error.msg.message
            })
        }
        // else
        setUser({ ...user, msg: null })

    }, [error])

    // # Auth effect
    useEffect(() => {

        // If authenticated, close modal
        if (user.modal) {
            if (auth.isAuthenticated) {
                toggle()
            }
        }
    }, [auth])



    return (
        <div>
            <NavLink onClick={toggle} href="#">
                Login
           </NavLink>

            <Modal
                isOpen={user.modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>
                    Login
                </ModalHeader>

                <ModalBody>

                    {/* //todo: show alert */}
                    {
                        user.msg
                            ? <Alert color="danger">{user.msg}</Alert>
                            : null
                    }

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                className="mb-3"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={handleOnChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                className="mb-3"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={handleOnChange}
                            />
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block

                            >Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default LoginModal
