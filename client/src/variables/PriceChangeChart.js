import React, { Component } from 'react'
import { Line, Bar } from "react-chartjs-2";
import html2canvas from 'html2canvas'
import pdfConverter from 'jspdf'
import { connect } from 'react-redux';
export class PriceChangeChart extends Component {
    constructor() {
        super()
        this.returnPriceChanges = this.returnPriceChanges.bind(this)
    }
    returnPriceChanges() {
        let transection = []
        transection.push(this.props.transection.sevenDaysHistory[0].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[1].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[2].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[3].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[4].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[5].totalPriceChange)
        transection.push(this.props.transection.sevenDaysHistory[6].totalPriceChange)
        return transection.reverse()
    }


    render() {
        let chartExample4 = {
            data: canvas => {
                let ctx = canvas.getContext("2d");

                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
                gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
                gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

                return {
                    labels: ["6 Day ago", "5 Day ago", "4 Day ago", "3 Day ago", "2 Day ago", "1 Day ago", "TODAY"],
                    datasets: [
                        {
                            label: "Price Change At This Day",
                            fill: true,
                            backgroundColor: gradientStroke,
                            borderColor: "#00d6b4",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#00d6b4",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#00d6b4",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: [...this.returnPriceChanges()]
                        }
                    ]
                };
            },
            options: {
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
                                suggestedMin: 50,
                                suggestedMax: 125,
                                padding: 20,
                                fontColor: "#9e9e9e"
                            }
                        }
                    ],

                    xAxes: [
                        {
                            barPercentage: 1.6,
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(0,242,195,0.1)",
                                zeroLineColor: "transparent"
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#9e9e9e"
                            }
                        }
                    ]
                }
            }
        };

        return (

            <div className="chart-area">
                <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    transection: state.transection,
})
export default connect(mapStateToProps)(PriceChangeChart)
