import Axios from 'axios'
import * as Types from './type'


export const loadTransection = () => dispatch => {
    Axios.get('/filter')
        .then(res => {
            let thisMonth = new Date().getMonth() + 1
            let trLength = []
            const returnMonthName = (id) => {
                if (id == 1) {
                    return "January"
                }
                if (id == 2) {
                    return "February"
                }
                if (id == 3) {
                    return "March"
                }
                if (id == 4) {
                    return "April"
                }
                if (id == 5) {
                    return "May"
                }
                if (id == 6) {
                    return "June"
                }
                if (id == 7) {
                    return "July"
                }
                if (id == 8) {
                    return "August"
                }
                if (id == 9) {
                    return "September"
                }
                if (id == 10) {
                    return "October"
                }
                if (id == 11) {
                    return "November"
                }
                if (id == 12) {
                    return "December"
                }
            }
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
            trLength.length = thisMonth
            let thisMonthTransection = res.data[returnMonthName(thisMonth)]
            let todayDate = new Date().getDate()



            var transection0 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate}`;
            });
            var transection1 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-1}`;
            });
            var transection2 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-2}`;
            });
            var transection3 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-3}`;
            });
            var transection4 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-4}`;
            });
            var transection5 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-5}`;
            });
            var transection6 =  thisMonthTransection[0].filter(function(hero) {
                let heroDate=hero.insertDate.split('T')[0]
                return heroDate == `2020-10-${todayDate-6}`;
            });
            const makeTotal=(array)=>{
                let total=0
                array.map(el=>{
                    total=total+ parseInt(el.currentPrice)
                })
                return total
            }
            const makeTotalPriceChange=(array)=>{
                let total=0
                array.map(el=>{
                    total=total+ parseInt(el.priceChange)
                })
                return total
            }
            let t1={transection:transection0,total:makeTotal(transection0),totalPriceChange:makeTotalPriceChange(transection0)}
            let t2={transection:transection1,total:makeTotal(transection1),totalPriceChange:makeTotalPriceChange(transection1)}
            let t3={transection:transection2,total:makeTotal(transection2),totalPriceChange:makeTotalPriceChange(transection2)}
            let t4={transection:transection3,total:makeTotal(transection3),totalPriceChange:makeTotalPriceChange(transection3)}
            let t5={transection:transection4,total:makeTotal(transection4),totalPriceChange:makeTotalPriceChange(transection4)}
            let t6={transection:transection5,total:makeTotal(transection5),totalPriceChange:makeTotalPriceChange(transection5)}
            let t7={transection:transection6,total:makeTotal(transection6),totalPriceChange:makeTotalPriceChange(transection6)}
            dispatch({
                type: Types.SET_FILTEREDT_TRANSECTION,
                payload: {
                    filteredTransection: res.data,
                    countTransection: trLength,
                    sevenDaysHistory:[t1,t2,t3,t4,t5,t6,t7],
                    thisMonthTransection:thisMonthTransection
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
}