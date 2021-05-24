import { GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEM_LOADING } from './types'
import axios from 'axios'

export const getItems = () => async (dispatch) => {

    // # Waiting data from server..
    dispatch(setItemLoading())

    // # GET data from sever.
    await axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))

}

export const addItem = (itemData) => async (dispatch) => {

    await axios.post('/api/items', itemData)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))


}

export const deleteItem = (id) => async (dispatch) => {

    await axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
        }))


}

export const setItemLoading = () => (dispatch) => {
    dispatch({
        type: ITEM_LOADING
    })
}