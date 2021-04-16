import React from 'react';
import axios from 'axios';
import CryptoSelect from './components/cryptoSelectComponent'
import TimePeriodSelect from './components/timePeriodSelectComponent'
import CryptoHistoricGraph from './components/cryptoHistoricGraphComponent'
import TopBar from './components/topBarComponent'
import './app.css';

interface IProps {
}

interface IState {
  selectedCoin?: selectOption;
  selectedTimePeriod?: selectOption;
  coinPrices: priceObject[];
  coinInfo: any;
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
      selectedCoin: { label: 'Bitcoin', value: 'Qwsogvtv82FCd' },
      selectedTimePeriod: { label: '1y', value: '1y' },
      coinPrices: [],
      coinInfo: null,
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

  getCryptoInfo(coinUuid: string | undefined) {
    var url = '/v2/coin/' + coinUuid
    axios.get(url)
      .then(async res => {
        if (res.data) {
          this.setState({ coinInfo: res.data })
        }
      })
  }

  componentDidMount() {
    this.getCryptoHistoric();
    this.getCryptoInfo(this.state.selectedCoin?.value)
  }

  handleTimePeriodChange = (timePeriodSelected: selectOption) => {
    this.setState({ selectedTimePeriod: timePeriodSelected }, () => {
      this.getCryptoHistoric()
    })
  }

  handleCryptoChange = (cryptoSelected: selectOption) => {
    this.setState({ selectedCoin: cryptoSelected }, () => {
      this.getCryptoHistoric()
      this.getCryptoInfo(this.state.selectedCoin?.value)
    })
  }

  render() {
    return (
      <div className='main'>


        <div className='left'>
          <div className='left-content'>
            <p>CryptoPriceGraphing</p>
            <label htmlFor="">Cryptocurrency </label>
            <CryptoSelect className='cyptoSelect select' onSelectCrypto={this.handleCryptoChange.bind(this)} />
            <div className='timePeriodSelect'>
              <label>Time period</label>
              <TimePeriodSelect className='select' onSelectTimePeriod={this.handleTimePeriodChange.bind(this)} />
            </div>
          </div>

        </div>
        <div className='right'>
          <TopBar coinInfo={this.state.coinInfo} />
          <CryptoHistoricGraph className='graphic' historicData={this.state.coinPrices} />
        </div>
      </div>
    );
  }
}

export default App;
