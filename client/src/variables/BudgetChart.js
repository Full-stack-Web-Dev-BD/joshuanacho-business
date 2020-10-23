import React, { Component } from 'react'
import { Line, Bar } from "react-chartjs-2";
import { connect } from 'react-redux';


class BudgetChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1",
            labels: [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC"
            ],
        };
        this.returnMunth = this.returnMunth.bind(this)
        this.returnTransection=this.returnTransection.bind(this)
    }

    returnMunth() {
        let month = this.state.labels
        let thisMonth = new Date().getMonth() + 1
        month.length = thisMonth
        if (month.length > 4) {
            // console.log(month.slice(2,6))
            return month.slice(thisMonth - 4, thisMonth)
            // console.log(month);
        }
        return month
    }

    returnTransection() {
        let transection= this.props.transection.countTransection
        let thisMonth = new Date().getMonth() + 1
        transection.length = thisMonth
        if (transection.length > 4) {
            // console.log(month.slice(2,6))
            return transection.slice(thisMonth - 4, thisMonth)
            // console.log(month);
        }
        return transection
    }

    render() {
        let chart1_2_options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.0)",
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            suggestedMin: 60,
                            suggestedMax: 125,
                            padding: 20,
                            fontColor: "#9a9a9a"
                        }
                    }
                ],
                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(29,140,248,0.1)",
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9a9a9a"
                        }
                    }
                ]
            }
        };
        let chartExample2 = {
            data: canvas => {
                let ctx = canvas.getContext("2d");

                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

                return {
                    labels: [...this.returnMunth()],
                    datasets: [
                        {
                            label: "Data",
                            fill: true,
                            backgroundColor: gradientStroke,
                            borderColor: "#1f8ef1",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#1f8ef1",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#1f8ef1",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            // data: [80, 100, 70, 80, 120, 80]
                            data: [...this.returnTransection()]
                        }
                    ]
                };
            },
            options: chart1_2_options
        }

        return (

            <div onClick={this.returnTransection} className="chart-area">
                <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    transection: state.transection,
})
export default connect(mapStateToProps)(BudgetChart)
