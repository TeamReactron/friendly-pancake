#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas.util.testing as tm
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os
import pickle
import requests
import cgi, cgitb



import folium
from folium.plugins import HeatMap
from flask import request


app = Flask(__name__)

@app.route('/')
def dynamic_page():
    return your_module.your_function_in_the_module()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)

cgitb.enable()
loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
df_sel = pd.read_csv('df_sel.csv')
target='Severity'
df_sel=df_sel.drop(target, axis=1)
df_sel['Temperature(F)'] = 1
df_sel['Humidity(%)'] = 2
df_sel['Visibility(mi)'] = 0
y_pred= loaded_model.predict(df_sel)
df_sel['Severity']=y_pred
traffic_df = df_sel.groupby(['Start_Lng','Start_Lat'])['Severity'].count()
traffic_df =traffic_df.to_frame()
traffic_df.columns.values[0]='count1'
traffic_df = traffic_df.reset_index()
coor = traffic_df[['Start_Lat','Start_Lng','count1']].values.tolist()
hmap = folium.Map(location=[min(df_sel['Start_Lat']),min(df_sel['Start_Lng'])], zoom_start=10, )
hmap.add_child(HeatMap(coor, radius = 5))
hmap.save('hmap.html')





def main(temp, humi):
    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    df_sel = pd.read_csv('df_sel.csv')
    target='Severity'
    df_sel=df_sel.drop(target, axis=1)
    df_sel['Temperature(F)'] = temp
    df_sel['Humidity(%)'] = humi
    df_sel['Visibility(mi)'] = 0
    y_pred= loaded_model.predict(df_sel)
    df_sel['Severity']=y_pred
    traffic_df = df_sel.groupby(['Start_Lng','Start_Lat'])['Severity'].count()
    traffic_df =traffic_df.to_frame()
    traffic_df.columns.values[0]='count1'
    traffic_df = traffic_df.reset_index()
    coor = traffic_df[['Start_Lat','Start_Lng','count1']].values.tolist()
    hmap = folium.Map(location=[min(df_sel['Start_Lat']),min(df_sel['Start_Lng'])], zoom_start=10, )
    hmap.add_child(HeatMap(coor, radius = 5))
    hmap.save('hmap.html')
    return 0


if __name__ == '__main__':
    # temp = request.GET.getlist('temp')
    # humi = request.GET.getlist('humi')
    # print(temp)
    form = cgi.FieldStorage()
    temp = form.getvalue('temp')
    humi = form.getvalue('humi')
    main(temp, humi)




