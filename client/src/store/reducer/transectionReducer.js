import * as Types from '../actions/type'
const init={
    filteredTransection:{},
    countTransection:[],
    error:{}
}

const transectionReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.SET_FILTEREDT_TRANSECTION:{
            return{
                filteredTransection:action.payload.filteredTransection,
                countTransection:action.payload.countTransection,
                error:{}
            }
        }
        default:
            return state;
    }
}

export default transectionReducer