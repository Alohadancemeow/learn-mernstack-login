import { GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEM_LOADING } from './types'
import axios from 'axios'
import { tokenConfig } from '../actions/authAction'
import { returnErrors } from './errorAction'

export const getItems = () => async (dispatch) => {

    // # Waiting data from server..
    dispatch(setItemLoading())

    // # GET data from sever.
    await axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(
            err.response.data,
            err.response.status
        )))

}

export const addItem = (itemData) => async (dispatch, getState) => {

    await axios.post('/api/items', itemData, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(
            err.response.data,
            err.response.status
        )))


}

export const deleteItem = (id) => async (dispatch, getState) => {

    await axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEMS,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(
            err.response.data,
            err.response.status
        )))


}

export const setItemLoading = () => (dispatch) => {
    dispatch({
        type: ITEM_LOADING
    })
}