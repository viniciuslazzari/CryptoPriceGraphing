import React from 'react';
import axios from 'axios';
import Select from 'react-select'

require('dotenv').config()

interface Coin {
	name: string;
	uuid: string;
}

interface IProps {
	onSelectCrypto: Function;
}

interface IState {
	data: Coin[];
}


export default class CryptoSelect extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			data: []
		}
	}

	headers = {
		'Content-Type': 'application/json',
		'x-access-token': process.env.API_KEY,
	}

	componentDidMount() {
		axios.get('/v2/coins', { headers: this.headers })
			.then(res => {
				if (res.data) {
					res.data.data.coins.map((coin: { name: any; uuid: any; }) => {
						const coinObject: Coin = {
							name: coin.name,
							uuid: coin.uuid
						}
						let data = this.state.data;
						data.push(coinObject)
						this.setState({ data: data })
					})
				}
			})
	}

	handleCryptoChange = (selectedOption: any) => {
		this.props.onSelectCrypto(selectedOption);
	}

	render() {
		const options = this.state.data.map((coin) => {
			return {
				label: coin.name,
				value: coin.uuid,
			}
		})

		return <div>
			<Select
				options={options}
				onChange={this.handleCryptoChange.bind(this)}
			/>
		</div>;
	}
}