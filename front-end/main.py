import redis,os
import pandas as pd
import pyarrow as pa
from kaggle.api.kaggle_api_extended import KaggleApi

# pip install kaggle,redis,pandas,pyarrow


dataset_path = os.getcwd()
file_name = 'US_Accidents_Dec19.csv'
col_list=['ID', 'Severity', 'Start_Time', 'End_Time', 'Number', 'Street', 'City', 'County', 'State', 'Zipcode',
          'Country', 'Humidity(%)', 'Wind_Speed(mph)', 'Precipitation(in)', 'Weather_Condition']


if __name__ == "__main__":
    #download file from kaggle
    if os.path.exists(dataset_path + '/' + file_name) == False:
        api = KaggleApi()
        api.authenticate()
        api.dataset_download_files('sobhanmoosavi/us-accidents',path = dataset_path,unzip=True)

    # read select data into pandas dataframe
    df = pd.read_csv(file_name,usecols=col_list,nrows=20)
    # print(df)

    # redis connection
    r = redis.Redis(
        host='localhost',
        port=6379,
        db = 0)
    # r.set("key", df.to_msgpack(compress='zlib'))
    # pipe = r.pipeline()
    # for i in range(len(df['value'])):
    #     pipe.set(df['hash'][i], df['value'][i])
    # results = pipe.execute()

    print(type(df))
    # print(df[['ID']])
    stateDict = {}
    # load dataframe into redis


    for index, row in df.iterrows():
        # print(row['State'])
        if row['County'] not in stateDict:
            stateDict[row['County']] = [row]
            # print(type([row]))
        else :
            # print(stateDict[row['State']])
            stateDict[row['County']].append(row)
    # print(stateDict)


    context = pa.default_serialization_context()
    # r.set("key", context.serialize(df.loc['A-1']).to_buffer().to_pybytes())
    # r.set("OH", context.serialize(stateDict['OH']).to_buffer().to_pybytes())
    # print(context.deserialize(r.get("OH")))

    for county in stateDict:
        r.set(county, context.serialize(stateDict[county]).to_buffer().to_pybytes())
        print(context.deserialize(r.get(county)))
    # for i in range (5): 
    #     r.set("key" + str(i), context.serialize(df[i]).to_buffer().to_pybytes())
    #     print( context.deserialize(r.get("key"+ str(i))))

