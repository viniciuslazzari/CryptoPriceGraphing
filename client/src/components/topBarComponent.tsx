import React from 'react';
import axios from 'axios';

require('dotenv').config()

interface coinInfo {
	icon: string;
	name: string;
	ticker: string;
	price: number;
	mktCap: string;
	volume: string;
	change: number;
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
			coinInfo: { icon: '', name: '', ticker: '', price: 0, mktCap: '', volume: '', change: 0 }
		}
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (prevProps.coinInfo !== this.props.coinInfo) {
			const info = this.props.coinInfo.data.coin
			const coinInfo: coinInfo = {
				icon: info.iconUrl,
				name: info.name,
				ticker: info.symbol,
				price: Math.round(info.price * 100) / 100,
				mktCap: this.roundNumber(info.marketCap),
				volume: this.roundNumber(info['24hVolume']),
				change: Math.round(info.change * 100) / 100
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
			<div className='topbar-item'>
				<div className='topbar-item-content topbar-item-content-icon'>
					<img className='coinIcon' src={this.state.coinInfo.icon} />
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle-content'>{this.state.coinInfo.name}</p>
					<p className='topbar-subtitle'>{this.state.coinInfo.ticker}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p className='topbar-subtitle'>${this.state.coinInfo.price}</p>
					<p className='topbar-subtitle-content'>{this.state.coinInfo.change}%</p>
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