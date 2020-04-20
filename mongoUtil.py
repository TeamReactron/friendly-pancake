from pymongo import UpdateOne, MongoClient
import csv
from pprint import pprint
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne, WriteConcern
from pymongo.errors import BulkWriteError
import os
from kaggle.api.kaggle_api_extended import KaggleApi



# match_connection = MongoClient(**MONGODB_CONFIG)
# match_collection = match_connection[]


dataset_path = os.getcwd()
file_name = 'US_Accidents_Dec19.csv'

client = MongoClient('localhost', 27017)
# os.getenv("MONGODB_CONFIG")

teleArr = []

db = client.accident_database
accidentCollection = db.accident_collection
weatherCollection = db.weather_coolection

coll = db.get_collection(
    'test', write_concern=WriteConcern(w=3, wtimeout=1))

def writeAccidentToMongo(arr):
    if len(arr) > 0:
        try:
            db.accidentCollection.bulk_write([
                # InsertOne({'_id':teleArr[2]}),
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
                    'Weather_Timestamp': arr[i][22],
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
                    }) for i in range(len(arr) - 1)
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
                    }) for i in range(len(arr) - 1)
                ])
        except BulkWriteError as bwe:
            pprint(bwe.details)
        # logger.info(f'Loaded {} matches into db')




if __name__ == "__main__":
    # file = open('./US_Accidents_Dec19.csv', 'r')
    # print(file.readline())
    # for line in file:
        
    #     sline = line.split(',')
    #     teleArr.append(sline)

    # file.close()
    if os.path.exists(dataset_path + '/' + file_name) == False:
        api = KaggleApi()
        api.authenticate()
        api.dataset_download_files('sobhanmoosavi/us-accidents',path = dataset_path,unzip=True)


    with open('US_Accidents_Dec19.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            # sline = row.split(',')
            teleArr.append(row)

    writeAccidentToMongo(teleArr)
    writeWeatherToMongo(teleArr)
    # print(teleArr)
    # db.accidentCollection.drop()