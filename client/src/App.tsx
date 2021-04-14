import React from 'react';
import axios from 'axios';
import CryptoSelect from './components/cryptoSelectComponent'
import CryptoHistoricGraph from './components/cryptoHistoricGraphComponent'

interface IProps {
}

interface IState {
  selectedCoin?: selectOption;
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
      coinPrices: []
    }
  }

  getCryptoHistoric() {
    var url = 'http://localhost:8080/api/v1/historicaldata?timePeriod=1y&coin=' + this.state.selectedCoin?.value
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

  handleCryptoChange = (cryptoSelected: selectOption) => {
    this.setState({ selectedCoin: cryptoSelected }, () => {
      this.getCryptoHistoric()
    })
  }

  render() {
    return (
      <div className="App" >
        <CryptoSelect onSelectCrypto={this.handleCryptoChange.bind(this)} />
        <CryptoHistoricGraph historicData={this.state.coinPrices} />
      </div>
    );
  }
}

export default App;
