import requests
import pandas as pd
import sys

url = 'https://api.coindesk.com/v1/bpi/historical/close.json'
# url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2020-09-05'


def getBitcoinPriceHistory():
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as err:
        print('Something went wrong: ' + err)
    else:
        if response.status_code == 200:
            pricesHistory = response.json()['bpi']
            df = pd.DataFrame.from_dict(
                pricesHistory, orient='index', columns=['Price'])
            output = df.to_json()
            print(output)
            sys.stdout.flush()
        else:
            print(response.status_code)


getBitcoinPriceHistory()
