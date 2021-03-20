import {
    GET_BIRDS_REQUEST, GET_BIRDS_SUCCESS, GET_BIRDS_FAILURE,
    GET_BIRD_REQUEST, GET_BIRD_SUCCESS, GET_BIRD_FAILURE,
    ADD_BIRD_REQUEST, ADD_BIRD_SUCCESS, ADD_BIRD_FAILURE
} from "./actionTypes";

const initialState = {
    isLoading: false,
    error: null,
    birds: [],
    page:1,
    limit:5,
    max:0,
    bird:""
}

export const birdsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_BIRDS_REQUEST:
            return {
                ...state,
                isLoading: true,
                page:payload.page,
                limit:payload.limit,
                error: null
            }
        case GET_BIRDS_SUCCESS:            
            return {
                ...state,
                birds: payload.current,
                max:payload.maxlength,
                isLoading: false
            }

        case GET_BIRDS_FAILURE:
            return {
                ...state,
                error: true,
                isLoading: false
            }


        case GET_BIRD_REQUEST: {
            console.log("request")
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }

        case GET_BIRD_SUCCESS: {
            return {
                ...state,
                bird: payload,
                isLoading: false
            }
        }

        case GET_BIRD_FAILURE:
            return {
                ...state,
                error: true,
                isLoading: false
            }



        default: return state
    }
}
