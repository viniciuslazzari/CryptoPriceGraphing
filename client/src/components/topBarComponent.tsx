import React from 'react';

require('dotenv').config()

interface coinInfo {
	icon: string;
	name: string;
	ticker: string;
	price: number;
	mktCap: string;
	volume: string;
	change: number;
	positiveChange: boolean;
}

interface IProps {
	coinInfo: any;
}

interface IState {
	coinInfo: coinInfo;
}


export default class TopBar extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			coinInfo: { icon: '', name: '', ticker: '', price: 0, mktCap: '', volume: '', change: 0, positiveChange: false }
		}
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.coinInfo !== this.props.coinInfo) {
			const info = this.props.coinInfo.data.coin
			const coinInfo: coinInfo = {
				icon: info.iconUrl,
				name: info.name,
				ticker: info.symbol,
				price: Math.round(info.price * 100) / 100,
				mktCap: this.roundNumber(info.marketCap),
				volume: this.roundNumber(info['24hVolume']),
				change: Math.round(info.change * 100) / 100,
				positiveChange: (Math.round(info.change * 100) / 100) > 0
			}
			console.log(coinInfo)
			this.setState({ coinInfo: coinInfo })
		}
	}

	roundNumber(number: number) {
		if (number >= 1.0e+12) {
			return (Math.round(number / 1.0e+12 * 100) / 100).toString() + 'T'
		} else if (number >= 1.0e+9) {
			return (Math.round(number / 1.0e+9 * 100) / 100).toString() + 'B'
		} else if (number >= 1.0e+6) {
			return (Math.round(number / 1.0e+6 * 100) / 100).toString() + 'M'
		} else if (number >= 1.0e+3) {
			return (Math.round(number / 1.0e+3 * 100) / 100).toString() + 'K'
		} else {
			return (Math.round(number * 100) / 100).toString()
		}
	}

	render() {
		return <div className='topbar'>
			<div className='topbar-item-icon'>
				<div className='topbar-item-content topbar-item-content-icon'>
					<img className='coinIcon' src={this.state.coinInfo.icon} />
				</div>
			</div>
			<div className='topbar-item-main'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle-content'>{this.state.coinInfo.name} ({this.state.coinInfo.ticker})</p>
					{this.state.coinInfo.positiveChange ? (
						<p className='topbar-pricechange topbar-subtitle-content-positive'>▲ {this.state.coinInfo.change}%</p>
					) : (
						<p className='topbar-pricechange topbar-subtitle-content-negative'>▼ {this.state.coinInfo.change}%</p>
					)}
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle'>PRICE</p>
					<p className='topbar-subtitle-content'>${this.state.coinInfo.price}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle'>MARKET CAP</p>
					<p className='topbar-subtitle-content'>${this.state.coinInfo.mktCap}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle'>VOLUME (24H)</p>
					<p className='topbar-subtitle-content'>${this.state.coinInfo.volume}</p>
				</div>
			</div>
		</div>
	}
}