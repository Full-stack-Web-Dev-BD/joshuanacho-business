import Axios from 'axios'
import jwtDecoder from 'jwt-decode'
import * as Types from './type'


export const register = (user, history) => dispatch => {
    Axios.post('/register', user)
        .then((res) => {
            console.log(res);
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: {}
                }
            })
            history.push('/login')
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}
export const login = (loginInfo, history) => dispatch => {
    Axios.post('/login', loginInfo)
        .then(res => {
            let decoded = jwtDecoder(res.data.token)
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decoded,
                    error: {}
                }
            })
            window.localStorage.setItem('load-token', res.data.token)
            history.push('/admin/dashboard')
        })
        .catch(err => {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}
export const setInitialData = (userData) => dispatch => {
    Axios.get(`/single-user/${userData._id}`)
        .then(res => {
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: res.data,
                    error: {}
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
}
export const logout = (history) => dispatch => {
    window.localStorage.removeItem('load-token')
    dispatch({
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    })
    history.push('/login')
}
export const uploadPP = (fData) => dispatch => {
    console.log(fData);
    Axios.post('/uploadpp', fData)
        .then(res => {
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: res.data,
                    error: {}
                }
            })
        })
        .catch(err => {
            console.log(err.response.data);
            alert('err')
        })
}
export const updateProfile = updateData => dispatch => {
    Axios.post('/updateProfile', updateData)
        .then(res => {
            setTimeout(() => {
                return dispatch({
                    type: Types.USER_ERROR,
                    payload: {
                        error: {}
                    }
                })
            }, 5000);
            return dispatch({
                type: Types.SET_USER,
                payload: {
                    user: res.data.user,
                    error: {
                        type: 'success',
                        message: res.data.message
                    }
                }
            })
        })
        .catch(err => {
            if (err.response) {
                setTimeout(() => {
                    dispatch({
                        type: Types.USER_ERROR,
                        payload: {
                            error: {}
                        }
                    })
                }, 5000);
                dispatch({
                    type: Types.USER_ERROR,
                    payload: {
                        error: {
                            type: 'error',
                            message: err.response.data.message
                        }
                    }
                })
            }
        })
}
// alaminprogramer@gmail.com