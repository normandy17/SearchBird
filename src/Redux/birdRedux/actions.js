import axios from "axios";
import {
    GET_BIRDS_REQUEST, GET_BIRDS_SUCCESS, GET_BIRDS_FAILURE,
    GET_BIRD_REQUEST, GET_BIRD_SUCCESS, GET_BIRD_FAILURE,
    ADD_BIRD_REQUEST, ADD_BIRD_SUCCESS, ADD_BIRD_FAILURE
} from "./actionTypes";

const addBird_Request = (payload) => ({
    type: ADD_BIRD_REQUEST,
    payload
})

const addBird_Success = (payload) => ({
    type: ADD_BIRD_SUCCESS,
    payload
})

const addBird_Failure = (payload) => ({
    type: ADD_BIRD_FAILURE,
    payload
})

const getBird_Request = () => ({
    type: GET_BIRD_REQUEST
})

const getBird_Success = (payload) => ({
    type: GET_BIRD_SUCCESS,
    payload
})

const getBird_Failure = (payload) => ({
    type: GET_BIRD_FAILURE,
    payload
})

const getBirds_Request = (page,limit) => ({
    type: GET_BIRDS_REQUEST,
    payload:{page:page,limit:limit}
})

const getBirds_Success = (payload) => ({
    type: GET_BIRDS_SUCCESS,
    payload
})

const getBirds_Failure = (payload) => ({
    type: GET_BIRDS_FAILURE,
    payload
})



export const getBirds = (page, limit) => dispatch => {
    dispatch(getBirds_Request(page,limit))
    console.log("getting birds")
    const config = {
            method: 'get',
            url: `https://birdsapi.herokuapp.com/api/birds?page=${page}&limit=${limit}`
        }
    

    return axios(config)
        .then((res) => {
             console.log(res.data)
            dispatch(getBirds_Success(res.data))
            return true
        }).catch((err) => {
             console.log(err)
            dispatch(getBirds_Failure(err))
        });
}

export const getBird = (id) => dispatch => {
    dispatch(getBird_Request())
    console.log("getting")
    const config = {
        method: 'get',
        url: `https://birdsapi.herokuapp.com/api/birds/bird/${id}`
    }
    return axios(config)
        .then((res) => {
            // console.log(res.data)
            dispatch(getBird_Success(res.data))
            return true
        }).catch((err) => {
            // console.log(err)
            dispatch(getBird_Failure(err))
        });
}

export const addBird = (data) => dispatch => {
    dispatch(addBird_Request)
    const config = {
        method: 'post',
        url: `https://birdsapi.herokuapp.com/api/birds`,
        data:data
    }
    return axios(config)
        .then((res) => {
            dispatch(addBird_Success(res.data))
            return true
        }).catch((err) => {
            dispatch(addBird_Failure(err))
        });
}

export const editBird = (id,data) => dispatch => {
    const config = {
        method: 'put',
        url: `https://birdsapi.herokuapp.com/api/birds/${id}`,
        data:data
    }
    return axios(config)
        .then((res) => {
            //console.log(res.data)           
            return true
        }).catch((err) => {
            return false
        });
}

export const deleteBird = (id) => (dispatch) => {
    const config = {
        method: 'delete',
        url: `https://birdsapi.herokuapp.com/api/birds/${id}`,
    }
    return axios(config).then((res) => {        
       return true
   }).catch((err) => {
        console.log(err)       
   });
}