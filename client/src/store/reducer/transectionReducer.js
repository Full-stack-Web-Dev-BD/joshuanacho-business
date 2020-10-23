import * as Types from '../actions/type'
const init={
    thisMonthTransection:[],
    filteredTransection:{},
    countTransection:[],
    sevenDaysHistory:[
        {transection:[]},
        {transection:[]},
        {transection:[]},
        {transection:[]},
        {transection:[]},
        {transection:[]},
        {transection:[]},
    ],
    error:{}
}

const transectionReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.SET_FILTEREDT_TRANSECTION:{
            return{
                thisMonthTransection:action.payload.thisMonthTransection,
                filteredTransection:action.payload.filteredTransection,
                countTransection:action.payload.countTransection,
                sevenDaysHistory:action.payload.sevenDaysHistory,
                error:{}
            }
        }
        default:
            return state;
    }
}

export default transectionReducer