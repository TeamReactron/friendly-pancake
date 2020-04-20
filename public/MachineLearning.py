#!/usr/bin/env python
# coding: utf-8

# In[39]:


import pandas.util.testing as tm
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os

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


# In[45]:


df = pd.read_csv('US_accident_cleaned')
state='GA'

df_ga=df.loc[df.State==state].copy()
df_ga.drop('State',axis=1, inplace=True)


# In[46]:


feature_lst=['TMC','Severity','Start_Lng','Start_Lat','Distance(mi)','Temperature(F)','Humidity(%)','Visibility(mi)']
df_sel=df_ga[feature_lst].copy()
df_sel.to_csv('./df_sel.csv',index=False)
df_sel.info()


# In[47]:


target='Severity'

y = df_sel[target]
X = df_sel.drop(target, axis=1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=21, stratify=y)


# In[48]:


# Random Forest algorithm

#Create a Gaussian Classifier
clf=RandomForestClassifier(n_estimators=100)

#Train the model using the training sets y_pred=clf.predict(X_test)
clf.fit(X_train,y_train)

y_pred=clf.predict(X_test)

# Get the accuracy score
acc=accuracy_score(y_test, y_pred)


# Model Accuracy, how often is the classifier correct?
print("[Randon forest algorithm] accuracy_score: {:.3f}.".format(acc))


# In[49]:


print(y_pred)
print(y_pred.shape)
# print(X_test)
print(X_test.shape)


# In[50]:


X_test.head(10)


# In[51]:


X_test['Severity']=y_pred
df_sel = X_test
X_test.head(10)


# In[52]:


traffic_df = df_sel.groupby(['Start_Lng','Start_Lat'])['Severity'].count()
traffic_df =traffic_df.to_frame()
traffic_df.columns.values[0]='count1'
traffic_df = traffic_df.reset_index()
coor = traffic_df[['Start_Lat','Start_Lng','count1']].values.tolist()
    
hmap = folium.Map(location=[min(df_sel['Start_Lat']),min(df_sel['Start_Lng'])], zoom_start=10, )
hmap.add_child(HeatMap(coor, radius = 5))
hmap


# In[ ]:




