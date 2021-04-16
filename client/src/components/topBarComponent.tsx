import React from 'react';
import axios from 'axios';

require('dotenv').config()

interface coinInfo {
	icon: string;
	name: string;
	ticker: string;
	price: number;
	mktCap: number;
	volume: number;
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
			coinInfo: { icon: '', name: '', ticker: '', price: 0, mktCap: 0, volume: 0 }
		}
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (prevProps.coinInfo !== this.props.coinInfo) {
			const info = this.props.coinInfo.data.coin
			const coinInfo: coinInfo = {
				icon: info.iconUrl,
				name: info.name,
				ticker: info.symbol,
				price: Math.round(info.price * 1),
				mktCap: Math.round(info.marketCap),
				volume: Math.round(info['24hVolume'])
			}
			console.log(coinInfo)
			this.setState({ coinInfo: coinInfo })
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
					<p>{this.state.coinInfo.name}</p>
					<p>{this.state.coinInfo.ticker}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p>PRICE</p>
					<p>{this.state.coinInfo.price}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p>MARKET CAP</p>
					<p>{this.state.coinInfo.mktCap}</p>
				</div>
			</div>
			<div className='topbar-item'>
				<div className='topbar-item-content'>
					<p>VOLUME (24H)</p>
					<p>{this.state.coinInfo.volume}</p>
				</div>
			</div>
		</div>
	}
}