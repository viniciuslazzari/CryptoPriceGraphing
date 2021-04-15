import React from 'react';
import axios from 'axios';
import CryptoSelect from './components/cryptoSelectComponent'
import TimePeriodSelect from './components/timePeriodSelectComponent'
import CryptoHistoricGraph from './components/cryptoHistoricGraphComponent'
import './app.css';

interface IProps {
}

interface IState {
  selectedCoin?: selectOption;
  selectedTimePeriod?: selectOption;
  coinPrices: priceObject[]
}

interface selectOption {
  label: string;
  value: string;
}

interface priceObject {
  timestamp: string;
  price: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedCoin: undefined,
      selectedTimePeriod: undefined,
      coinPrices: []
    }
  }

  getCryptoHistoric() {
    var url = 'http://localhost:8080/api/v1/historicaldata?timePeriod=' + this.state.selectedTimePeriod?.value + '&coin=' + this.state.selectedCoin?.value
    axios.get(url)
      .then(async res => {
        if (res.data) {
          const coinPrices = await Object.entries(res.data.price).map(([key, value]) => {
            const priceObject: priceObject = {
              timestamp: key,
              price: Number(value)
            }
            return priceObject
          })
          this.setState({ coinPrices: coinPrices })
        }
      })
  }

  handleTimePeriodChange = (timePeriodSelected: selectOption) => {
    this.setState({ selectedTimePeriod: timePeriodSelected }, () => {
      this.getCryptoHistoric()
    })
  }

  handleCryptoChange = (cryptoSelected: selectOption) => {
    this.setState({ selectedCoin: cryptoSelected }, () => {
      this.getCryptoHistoric()
    })
  }

  render() {
    return (
      <div className='main'>
        <div className='left'>
          <div className='left-content'>
            <label htmlFor="">Select crypto</label>
            <CryptoSelect className='cyptoSelect select' onSelectCrypto={this.handleCryptoChange.bind(this)} />
            <label htmlFor="">Select time period</label>
            <TimePeriodSelect className='timePeriodSelect select' onSelectTimePeriod={this.handleTimePeriodChange.bind(this)} />
          </div>
        </div>
        <CryptoHistoricGraph className='graphic' historicData={this.state.coinPrices} />
      </div>
    );
  }
}

export default App;
