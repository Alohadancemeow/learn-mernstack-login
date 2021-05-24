// import { v4 as uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEMS, ITEM_LOADING } from '../actions/types'

const initialState = {
    items: [], // Object data from server.
    loading: false
}

export default (state = initialState, action) => {

    switch (action.type) {

        case ITEM_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }

        case ADD_ITEM:
            return {
                ...state, // state = [items] = {n}
                items: [
                    ...state.items, // -> {n}
                    action.payload // {n +1}
                ]
            }

        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload)
            }

        default:
            return state
    }
}