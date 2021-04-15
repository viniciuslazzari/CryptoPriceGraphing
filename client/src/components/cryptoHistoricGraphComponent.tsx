import React from 'react';
import { Line } from 'react-chartjs-2';

interface IProps {
	historicData: priceObject[];
	className: string;
}

interface IState {
	yLabel: number[];
	xLabel: string[];
}

interface priceObject {
	timestamp: string;
	price: number;
}

export default class CryptoHistoricGraph extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			yLabel: [],
			xLabel: []
		}
	}

	filterData(historicData: priceObject[]) {
		const yLabel: number[] = []
		const xLabel: string[] = []

		historicData.forEach(element => {
			yLabel.push(element.price)
			const date = new Date(Number(element.timestamp) * 1000);
			console.log(date)
			xLabel.push(date.toString())
		});

		this.setState({
			yLabel: yLabel,
			xLabel: xLabel
		})
	}

	componentDidUpdate(prevProps: { historicData: priceObject[]; }, prevState: any) {
		if (prevProps.historicData !== this.props.historicData) {
			this.filterData(this.props.historicData);
		}
	}

	render() {
		const data = {
			labels: this.state.xLabel,
			datasets: [
				{
					label: 'Price',
					data: this.state.yLabel,
					fill: true,
					borderColor: 'rgba(255, 255, 255)',
					backgroundColor: "rgba(255, 255, 255, 0.1)",
					pointRadius: 0,
				},
			],
		}

		const options = {
			layout: {
				padding: {
					top: 25,
					bottom: 25,
					left: 25,
					right: 40
				}
			},
			scales: {
				xAxes: [{
					type: 'time',
					gridLines: {
						zeroLineBorderDash: [5, 5],
						zeroLineColor: 'rgba(255, 255, 255, 0.5)',
						borderDash: [5, 5],
						color: "rgba(255, 255, 255, 0.5)",
					},
					ticks: {
						maxRotation: 0,
						minRotation: 0,
						autoSkipPadding: 75,
						fontColor: "rgba(255, 255, 255)",
						maxTicksLimit: 8
					}
				}],
				yAxes: [{
					gridLines: {
						zeroLineColor: "rgba(255, 255, 255)",
						display: false,
					},
					ticks: {
						fontColor: "rgba(255, 255, 255)",
					}
				}]
			},
			legend: {
				display: false
			},
			tooltip: {
				intersect: false,
				position: 'nearest'
			}
		}


		return <div className={this.props.className}>
			<Line
				data={data}
				options={options}
			/>
		</div >;
	}
}