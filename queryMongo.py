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

with open('./public/unemployment-by-county-2017.csv') as csv_file:
  csv_reader = csv.reader(csv_file, delimiter=',')
  for row in csv_reader:
    teleArr.append(row)

for tele in teleArr:
  county = tele[1].split(' ')[0]
  myquery = { "Weather_Timestamp_Date": "2018-10-24", 'County': county}
  print([tele[0], county, accidentCollection.find(myquery).count()])
  countyCount.append([tele[0], county, accidentCollection.find(myquery).count()])

with open('Oct24.csv', mode='w') as employee_file:
    employee_writer = csv.writer(employee_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for eachCounty in countyCount:
      employee_writer.writerow(eachCounty)
