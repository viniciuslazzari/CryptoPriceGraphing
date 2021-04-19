import React from 'react';
import Select from 'react-select'

require('dotenv').config()

interface SelectOption {
	label: string;
	value: string;
}

interface IProps {
	onSelectTimePeriod: Function;
	className: string;
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
					label: '3 hours',
					value: '3h'
				},
				{
					label: '24 hours',
					value: '24h'
				},
				{
					label: '7 days',
					value: '7d'
				},
				{
					label: '30 days',
					value: '30d'
				},
				{
					label: '3 months',
					value: '3m'
				},
				{
					label: '1 year',
					value: '1y'
				},
				{
					label: '3 years',
					value: '3y'
				},
				{
					label: '5 years',
					value: '5y'
				},
			]
		}
	}

	handleTimePeriodChange = (selectedOption: any) => {
		this.props.onSelectTimePeriod(selectedOption);
	}

	render() {
		return <div className={this.props.className}>
			<Select
				options={this.state.selectOptions}
				onChange={this.handleTimePeriodChange.bind(this)}
				defaultValue={{ label: "1 year", value: '1y' }}
			/>
		</div>;
	}
}