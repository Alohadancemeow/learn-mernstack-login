import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/authAction'
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

const RegisterModal = () => {

    const dispatch = useDispatch()

    // # call errorReducer
    const error = useSelector(state => state.error)
    console.log(error);


    // # State
    const [user, setUser] = useState({
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    })


    // # Show from
    const toggle = () => {
        setUser({
            modal: !user.modal
        })

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


    // todo: register
    const handleSubmit = (e) => {
        e.preventDefault()

        const { name, email, password } = user

        // console.log(user);

        // Create user object
        const newUser = {
            name,
            email,
            password
        }
        console.log(newUser);

        // Attempt ot register
        dispatch(register(newUser))

        // Close modal
        // toggle()

    }

    console.log(user);

    useEffect(() => {    

        if (error.id !== "REGISTER_FAIL") {
            setUser({
                ...user,
                msg: error.msg.message
            })
        } else {
            setUser({
                ...user,
                msg: null
            })
        }
    }, [error])



    return (
        <div>
            <NavLink onClick={toggle} href="#">
                Register
           </NavLink>

            <Modal
                isOpen={user.modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>
                    Register
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
                            <Label for="name">Name</Label>
                            <Input
                                className="mb-3"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={handleOnChange}
                            />
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

                            >Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default RegisterModal
