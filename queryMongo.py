from pymongo import UpdateOne, MongoClient
import csv
from pprint import pprint
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne, WriteConcern
from pymongo.errors import BulkWriteError
import os
import pymongo

client = MongoClient('localhost', 27017)
db = client.accident_database
accidentCollection = db.accidentCollection
weatherCollection = db.weatherCollection
countyWeatherCollection = db.countyWeatherCollection

teleArr = []
countyCount = []
timeParam = "2018-10-24"

with open('./public/unemployment-by-county-2017.csv') as csv_file:
  csv_reader = csv.reader(csv_file, delimiter=',')
  for row in csv_reader:
    teleArr.append(row)

# create an array for number of accidents occured in each county in given time frame
# timeParam is parameter passed in from the frontend that user selects
# countyCount is the array that will be passed into the heatmap as parameter
def queryForHeatMap(timeParam):
  for tele in teleArr:
    county = tele[1].split(' ')[0]
    myquery = { "Weather_Timestamp_Date": timeParam, 'County': county}
    print([tele[0], county, accidentCollection.find(myquery).count()])
    countyCount.append([tele[0], county, accidentCollection.find(myquery).count()])

# query the number of accidents that satisfies all given parameters
# arr = ['Bump': '', 'Crossing': '', 'Giveway': '', etc.]
def queryCountWithParam(arr):
  for ele in arr:
    if ele is '':
      ele = ['TRUE', 'FLASE']
    elif ele is 'YES':
      ele = 'TRUE'
    else:
      ele = 'FALSE'
  myquery = { "Weather_Timestamp_Date": arr[0], 'County': arr[1],
                    'Bump': {'$in': arr[2]},
                    'Crossing': {'$in': arr[3]},
                    'Give_Way': {'$in': arr[4]},
                    'Junction': {'$in': arr[5]},
                    'No_Exit': {'$in': arr[6]},
                    'Railway': {'$in': arr[7]},
                    'Roundabout': {'$in': arr[8]},
                    'Station': {'$in': arr[9]},
                    'Stop': {'$in': arr[10]},
                    'Traffic_Calming': {'$in': arr[11]},
                    'Traffic_Signal': {'$in': arr[12]},
                    'Turning_Loop': {'$in': arr[13]}}
  return accidentCollection.find(myquery)


# get the detailed information of each accident 
# that is within a given time range, in a given county
def queryCountyCountByTimeInterval(county, date1, date2):
  myquery = { 
    "Weather_Timestamp_Date": {"$gt": '2018-09-12', "$lt": '2018-10-12'}, 
    'City': "Reynoldsburg"}
  return accidentCollection.find(myquery)


# get array of number of accidents in a month in the given county 
# with its mean, min, and max severity
def queryContyCountMonthly(county, year):
  monthly = []
  month = 1
  while (month < 13):
    monthData = accidentCollection.aggregate([
      {
        '$match': {
          County: 'Fulton', 
          Weather_Timestamp_Year: year, 
          Weather_Timestamp_Month: month}
      },
      {
        '$group': {
          _id: '$County', total:{'$sum':1}, 
          avgSeverity: {'$avg': '$Severity'}, 
          minSeverity: {'$min': '$Severity'}, 
          maxSeverity: {'$max': '$Severity'}}
      }
    ])
    monthly.append([month, monthData])
  return monthly



with open('Oct24.csv', mode='w') as employee_file:
    employee_writer = csv.writer(employee_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    countyCount = queryForHeatMap(timeParam)
    for eachCounty in countyCount:
      employee_writer.writerow(eachCounty)
