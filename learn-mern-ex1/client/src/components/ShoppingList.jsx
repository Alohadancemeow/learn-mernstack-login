import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import { v4 as uuid } from 'uuid';

import { useDispatch, useSelector } from 'react-redux'
import { getItems, deleteItem } from '../redux/actions/itemAction'

const ShoppingList = () => {


    const dispatch = useDispatch()
    const { items } = useSelector(state => state.item)
    const { isAuthenticated } = useSelector(state => state.auth)

    // # Load all items.
    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])


    // # Add items
    // const HandleAddItem = () => {
    //     const name = prompt('Enter Item')

    //     if (name) {
    //         dispatch(addItem({
    //             id: uuid(), name: name
    //         }))
    //     }
    // }

    // # Delete item
    const handleDeleteItem = (id) => {

        dispatch(deleteItem(id))
    }

    return (
        <Container>
            {/* <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={HandleAddItem}
            >Add Item
            </Button> */}

            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {
                        items?.map(({ _id, name }) => (
                            <CSSTransition
                                key={_id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>

                                    { //todo: login or not ?
                                        isAuthenticated
                                            ? (
                                                <Button
                                                    className="remove-btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteItem(_id)}
                                                >&times;
                                                </Button>
                                            )
                                            : null
                                    }
                                    {name}

                                </ListGroupItem>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
            </ListGroup>


        </Container >
    )
}

export default ShoppingList
