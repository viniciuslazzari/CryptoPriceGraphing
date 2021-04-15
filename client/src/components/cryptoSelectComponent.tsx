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
	className: string;
}

interface IState {
	selectOptions: Coin[];
}


export default class CryptoSelect extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			selectOptions: []
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
						let selectOptions = this.state.selectOptions;
						selectOptions.push(coinObject)
						this.setState({ selectOptions: selectOptions })
					})
				}
			})
	}

	handleCryptoChange = (selectedOption: any) => {
		this.props.onSelectCrypto(selectedOption);
	}

	render() {
		const options = this.state.selectOptions.map((option) => {
			return {
				label: option.name,
				value: option.uuid,
			}
		})

		return <div className={this.props.className}>
			<Select
				options={options}
				onChange={this.handleCryptoChange.bind(this)}
				defaultValue={{ label: "Bitcoin", value: 'Qwsogvtv82FCd' }}
			/>
		</div>;
	}
}