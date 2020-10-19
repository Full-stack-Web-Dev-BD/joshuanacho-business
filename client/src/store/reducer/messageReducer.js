import * as Type from '../actions/type'

const init={
    type:'',
    message:''
}
const messageReducer=(state=init,action)=>{
    switch(action.type){
        case Type.SET_MESSAGE:{
            return {
                type:action.payload.type,
                message:action.payload.message
            }
        }
        case Type.REMOVE_MESSAGE:{
            return {}
        }
        default :return state
    }
}
export default messageReducer