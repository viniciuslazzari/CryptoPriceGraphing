import requests
import pandas as pd
import sys
import os
import json
from dotenv import load_dotenv

load_dotenv()
url = 'https://api.coinranking.com/v2/coin/'


def jsonToDataframe(json):
    df = pd.DataFrame(columns=['price'])

    for argument in json:
        df.loc[argument['timestamp']] = round(float(argument['price']), 2)

    return df


def getBitcoinPriceHistory():
    try:
        requestUrl = url + sys.argv[1] + '/history?timePeriod=' + sys.argv[2]
        response = requests.get(
            requestUrl, headers={"x-access-token": os.getenv("API_KEY")})
    except requests.exceptions.RequestException as err:
        print('Something went wrong: ' + err)
        sys.stdout.flush()
    else:
        if response.status_code == 200:
            pricesHistory = response.json()['data']['history']
            df = jsonToDataframe(pricesHistory)
            output = df.to_json()
            print(output)
            sys.stdout.flush()
        else:
            print(response.status_code)
            sys.stdout.flush()


getBitcoinPriceHistory()
