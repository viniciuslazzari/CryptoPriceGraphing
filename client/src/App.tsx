import React from 'react';
import CryptoSelect from './components/cryptoSelectComponent'

interface IProps {
}

interface IState {
  selectedCoin?: selectOption;
}

interface selectOption {
  label: string;
  value: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedCoin: undefined
    }
  }

  handleCryptoChange = (cryptoSelected: selectOption) => {
    this.setState({ selectedCoin: cryptoSelected })
  }

  render() {
    return (
      <div className="App">
        <CryptoSelect onSelectCrypto={this.handleCryptoChange.bind(this)} />
        <p> Selected coin: {this.state.selectedCoin?.label} </p>
      </div>
    );
  }
}

export default App;
