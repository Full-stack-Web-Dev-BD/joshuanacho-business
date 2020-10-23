import Axios from 'axios'
import * as Types from './type'


export const loadTransection = () => dispatch => {
    Axios.get('/filter')
        .then(res => {
            let trLength = []
            trLength.push(res.data.January[0].length)
            trLength.push(res.data.February[0].length)
            trLength.push(res.data.March[0].length)
            trLength.push(res.data.April[0].length)
            trLength.push(res.data.May[0].length)
            trLength.push(res.data.June[0].length)
            trLength.push(res.data.July[0].length)
            trLength.push(res.data.August[0].length)
            trLength.push(res.data.September[0].length)
            trLength.push(res.data.October[0].length)
            trLength.push(res.data.November[0].length)
            trLength.push(res.data.December[0].length)
            trLength.length=new Date().getMonth()+1
            dispatch({
                type: Types.SET_FILTEREDT_TRANSECTION,
                payload: {
                    filteredTransection: res.data,
                    countTransection:trLength
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
}