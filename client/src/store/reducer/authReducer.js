import * as Types from '../actions/type'

const init ={
    isAuthenticated:false,
    user:{},
    error:{}
}

const authReducer=(state=init,action)=>{
    switch(action.type){
        case Types.SET_USER:{
            return{
                user:action.payload.user,
                isAuthenticated:Object.keys(action.payload.user).length!==0,
                error:action.payload.error?action.payload.error:{}
            }
        }
        case Types.USER_ERROR:{
            return {
                ...state,
                error:action.payload.error
            }
        }
        default:return state
    }
}
export default authReducer