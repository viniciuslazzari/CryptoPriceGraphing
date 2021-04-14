import React from 'react';
import axios from 'axios';
import Select from 'react-select'

require('dotenv').config()

interface SelectOption {
	label: string;
	value: string;
}

interface IProps {
	onSelectTimePeriod: Function;
}

interface IState {
	selectOptions: SelectOption[];
}


export default class TimePeriodSelect extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			selectOptions: [
				{
					label: '3h',
					value: '3h'
				},
				{
					label: '24h',
					value: '24h'
				},
				{
					label: '7d',
					value: '7d'
				},
				{
					label: '30d',
					value: '30d'
				},
				{
					label: '3m',
					value: '3m'
				},
				{
					label: '1y',
					value: '1y'
				},
				{
					label: '3y',
					value: '3y'
				},
				{
					label: '5y',
					value: '5y'
				},
			]
		}
	}

	handleTimePeriodChange = (selectedOption: any) => {
		this.props.onSelectTimePeriod(selectedOption);
	}

	render() {
		return <div>
			<Select
				options={this.state.selectOptions}
				onChange={this.handleTimePeriodChange.bind(this)}
			/>
		</div>;
	}
}