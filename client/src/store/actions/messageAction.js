import * as Type from './type'

export const setMessage=({type,message})=>dispatch=>{
    dispatch({
        type:Type.SET_MESSAGE,
        payload:{
            type:type,
            message:message
        }
    })
}
export const removeMessage=()=>dispatch=>{
    dispatch({
        type:Type.REMOVE_MESSAGE,
        payload:{}
    })
}