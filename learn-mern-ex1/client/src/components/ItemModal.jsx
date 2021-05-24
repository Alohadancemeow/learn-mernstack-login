import React, { useState } from 'react'
// import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/actions/itemAction'
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    ModalHeader,
    Modal,
    ModalBody
} from 'reactstrap'

const ItemModal = () => {

    const dispatch = useDispatch()

    // # State
    const [item, setItem] = useState({
        modal: false,
        name: ''
    })

    // # Show from
    const toggle = () => {
        setItem({
            modal: !item.modal
        })
    }

    console.log(`OUT-> ${item.modal}`);

    
    const handleOnChange = (e) => {

        console.log(e.target.value);
        console.log(item.modal);
        
        setItem({
            modal: item.modal,
            [e.target.name]: e.target.value
        })
     
    }
 

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(item);

        // # MongoDB will gernarate own _id
        const newItem = {
            // id: uuid(),
            name: item.name
        }
        console.log(newItem);

        // Add item via addItem action
        dispatch(addItem(newItem))

        // Close modal
        toggle()
    }


    return (
        <div>
            <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={toggle}
            >Add Item
            </Button>

            <Modal
                isOpen={item.modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>
                    Add item to shopping list
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add shopping item"
                                onChange={handleOnChange}
                            />
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block

                            >Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default ItemModal
