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
			xLabel.push(element.timestamp)
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
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgba(255, 99, 132, 0.2)',
				},
			],
		}

		return <div>
			<Line
				data={data}
			/>
		</div >;
	}
}