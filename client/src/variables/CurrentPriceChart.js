import React, { Component } from 'react'
import { Line, Bar } from "react-chartjs-2";
import { connect } from 'react-redux';
export class CurrentPriceChart extends Component {
    constructor(){
        super()
        this.returnTransection=this.returnTransection.bind(this)
    }
    returnTransection() {
        let transection= []
        transection.push(this.props.transection.sevenDaysHistory[0].total)
        transection.push(this.props.transection.sevenDaysHistory[1].total)
        transection.push(this.props.transection.sevenDaysHistory[2].total)
        transection.push(this.props.transection.sevenDaysHistory[3].total)
        transection.push(this.props.transection.sevenDaysHistory[4].total)
        transection.push(this.props.transection.sevenDaysHistory[5].total)
        transection.push(this.props.transection.sevenDaysHistory[6].total)
        return transection.reverse()
    }
    render() {
        let chartExample3 = {
            data: canvas => {
                let ctx = canvas.getContext("2d");

                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
                gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
                gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

                return {
                    labels: ["6 Day ago", "5 Day ago", "4 Day ago", "3 Day ago", "2 Day ago", "1 Day ago", "TODAY"],
                    datasets: [
                        {
                            label: "Amount",
                            fill: true,
                            backgroundColor: gradientStroke,
                            hoverBackgroundColor: gradientStroke,
                            borderColor: "#d048b6",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            data: [...this.returnTransection()]
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
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(225,78,202,0.1)",
                                zeroLineColor: "transparent"
                            },
                            ticks: {
                                suggestedMin: 60,
                                suggestedMax: 120,
                                padding: 20,
                                fontColor: "#9e9e9e"
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                drawBorder: false,
                                color: "rgba(225,78,202,0.1)",
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
                <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    transection: state.transection,
})

export default connect(mapStateToProps) (CurrentPriceChart)
