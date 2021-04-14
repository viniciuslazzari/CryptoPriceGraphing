import React from 'react';
import { Line } from 'react-chartjs-2';

interface IProps {
	historicData: priceObject[];
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
			xLabel.push(date.toLocaleDateString("pt-BR"))
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
					fill: false,
					borderColor: 'rgba(102, 126, 234)',
					pointRadius: 0,
				},
			],
		}

		const options = {
			scales: {
				xAxes: [{
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
					},
					ticks: {
						maxTicksLimit: 10
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


		return <div>
			<Line
				data={data}
				options={options}
			/>
		</div >;
	}
}