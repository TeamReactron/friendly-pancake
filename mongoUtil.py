from pymongo import UpdateOne, MongoClient
import csv
from pprint import pprint
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne, WriteConcern
from pymongo.errors import BulkWriteError
# import os
# from kaggle.api.kaggle_api_extended import KaggleApi



# match_connection = MongoClient(**MONGODB_CONFIG)
# match_collection = match_connection[]


# dataset_path = os.getcwd()
# file_name = 'US_Accidents_Dec19.csv'

client = MongoClient('localhost', 27017)
# os.getenv("MONGODB_CONFIG")

teleArr = []
weatherArr = {}
aveWeatherArr = []

db = client.accident_database
accidentCollection = db.accident_collection
weatherCollection = db.weather_coolection
countyWeatherCollection = db.countyWeather_collection

coll = db.get_collection(
    'test', write_concern=WriteConcern(w=3, wtimeout=1))

def writeAccidentToMongo(arr):
    if len(arr) > 0:
        try:
            db.accidentCollection.bulk_write([
                # InsertOne({'_id':teleArr[2]}),
                # date = arr[i][22].split(' ')[0]
                # time = arr[i][22].split(' ')[0]
                InsertOne({
                    'ID': arr[i][0],
                    'Source': arr[i][1],
                    'TMC': arr[i][2],
                    'Severity': arr[i][3],
                    'Start_Time': arr[i][4],
                    'End_Time': arr[i][5],
                    'Start_Lat': arr[i][6],
                    'Start_Lng': arr[i][7],
                    'End_Lat': arr[i][8],
                    'End_Lng': arr[i][9],
                    'Distance(mi)': arr[i][10],
                    'Number': arr[i][12],
                    'Street': arr[i][13],
                    'Side': arr[i][14],
                    'City': arr[i][15],
                    'County': arr[i][16],
                    'State': arr[i][17],
                    'Zipcode': arr[i][18],
                    'Country': arr[i][19],
                    'Timezone': arr[i][20],
                    'Airport_Code': arr[i][21],
                    'Weather_Timestamp_Date': arr[i][22].split(' ')[0],
                    # 'Weather_Timestamp_Time': arr[i][22].split(' ')[1],
                    'Amenity': arr[i][32],
                    'Bump': arr[i][33],
                    'Crossing': arr[i][34],
                    'Give_Way': arr[i][35],
                    'Junction': arr[i][36],
                    'No_Exit': arr[i][37],
                    'Railway': arr[i][38],
                    'Roundabout': arr[i][39],
                    'Station': arr[i][40],
                    'Stop': arr[i][41],
                    'Traffic_Calming': arr[i][42],
                    'Traffic_Signal': arr[i][43],
                    'Turning_Loop': arr[i][44],
                    'Sunrise_Sunset': arr[i][45],
                    'Civil_Twilight': arr[i][46],
                    'Nautical_Twilight': arr[i][47],
                    'Astronomical_Twilight': arr[i][48],
                    }) for i in range(len(arr))
                ])
        except BulkWriteError as bwe:
            pprint(bwe.details)
        # logger.info(f'Loaded {} matches into db')



def writeWeatherToMongo(arr):
    if len(arr) > 0:
        try:
            db.weatherCollection.bulk_write([
                # InsertOne({'_id':teleArr[2]}),
                InsertOne({
                    'Start_Time': arr[i][4],
                    'End_Time': arr[i][5],
                    'Start_Lat': arr[i][6],
                    'Start_Lng': arr[i][7],
                    'End_Lat': arr[i][8],
                    'End_Lng': arr[i][9],
                    'Distance(mi)': arr[i][10],
                    'Street': arr[i][13],
                    'Side': arr[i][14],
                    'City': arr[i][15],
                    'County': arr[i][16],
                    'State': arr[i][17],
                    'Zipcode': arr[i][18],
                    'Country': arr[i][19],
                    'Timezone': arr[i][20],
                    'Airport_Code': arr[i][21],
                    'Weather_Timestamp': arr[i][22],
                    'Temperature(F)': arr[i][23],
                    'Wind_Chill(F)': arr[i][24],
                    'Humidity(%)': arr[i][25],
                    'Pressure(in)': arr[i][26],
                    'Visibility(mi)': arr[i][27],
                    'Wind_Direction': arr[i][28],
                    'Wind_Speed(mph)': arr[i][29],
                    'Precipitation(in)': arr[i][30],
                    'Weather_Condition': arr[i][31],
                    'Sunrise_Sunset': arr[i][45],
                    'Civil_Twilight': arr[i][46],
                    'Nautical_Twilight': arr[i][47],
                    'Astronomical_Twilight': arr[i][48],
                    }) for i in range(len(arr))
                ])
        except BulkWriteError as bwe:
            pprint(bwe.details)
        # logger.info(f'Loaded {} matches into db')

def writeAveWeatherToMongo(arr):
    if len(arr) > 0:
        try:
            db.countyWeatherCollection.bulk_write([
                # InsertOne({'_id':teleArr[2]}),
                InsertOne({
                    'County': arr[i][0],
                    'Date': arr[i][1],
                    'Temperature(F)': arr[i][2],
                    'Humidity(%)': arr[i][3],
                    'Pressure(in)': arr[i][4],
                    'Visibility(mi)': arr[i][5],
                    'Percipitation': arr[i][6], 
                    }) for i in range(len(arr))
                ])
        except BulkWriteError as bwe:
            pprint(bwe.details)
        # logger.info(f'Loaded {} matches into db')




if __name__ == "__main__":

    # if os.path.exists(dataset_path + '/' + file_name) == False:
    #     api = KaggleApi()
    #     api.authenticate()
    #     api.dataset_download_files('sobhanmoosavi/us-accidents',path = dataset_path,unzip=True)


    with open('US_Accidents_Dec19.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:

            # parse accident
            # sline = row.split(',')
            teleArr.append(row)

            #parse weather
        #     date = row[22].split(' ')[0]
        #     if row[16] is not '' and row[23] is not '' and row[25] is not '' and row[26] is not '' and row[27] is not '':
        #         if ((row[16], date)) not in weatherArr:
        #             percip = float(row[30]) if row[30] is not '' else 0
        #             weatherArr[row[16], date] = [[float(row[23])], [float(row[25])], [float(row[26])], [float(row[27])], [percip]]
        #         else:
        #             weatherArr[row[16], date][0].append(float(row[23]))
        #             weatherArr[row[16], date][1].append(float(row[25]))
        #             weatherArr[row[16], date][2].append(float(row[26]))
        #             weatherArr[row[16], date][3].append(float(row[27]))
        #             weatherArr[row[16], date][4].append(percip)

        # for key in weatherArr.keys():
        #     aveWeatherArr.append([key[0], key[1], sum(weatherArr[key][0])/len(weatherArr[key][0]), 
        #         sum(weatherArr[key][1])/len(weatherArr[key][1]), sum(weatherArr[key][2])/len(weatherArr[key][2]), 
        #         sum(weatherArr[key][3])/len(weatherArr[key][3]), sum(weatherArr[key][4])/len(weatherArr[key][4])])



    writeAccidentToMongo(teleArr)
    # writeWeatherToMongo(teleArr)
    # writeAveWeatherToMongo(aveWeatherArr)
    # db.accidentCollection.drop()