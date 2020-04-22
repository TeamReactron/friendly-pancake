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


from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.feature_selection import SelectFromModel
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_curve, auc
import folium
from folium.plugins import HeatMap


# In[30]:



def main():
    print("python main function")


if __name__ == '__main__':
    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    df_sel = pd.read_csv('df_sel.csv')
    target='Severity'
    df_sel=df_sel.drop(target, axis=1)
    df_sel['Temperature(F)'] = 0
    df_sel['Humidity(%)'] = 0
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
    hmap


# In[29]:


df_sel.head()


# In[31]:


hmap


# In[ ]:




