# friendly-pancake
## Data Preparation and Setup

### Which database system(s) and version(s) are you using? How do we install it/them? (providing a link to official documentation will be enough)
We are using MongoDB. Link to documentation: https://docs.mongodb.com


### How do we download the data you used for your project? Please do NOT submit ALL the data with your code (Submitting a very small portion (< 5 MB) so that we can run the demo might be okay)
kaggle authentication api token: https://www.kaggle.com/docs/api 

we also uploaded the sample csv file named sample.csv. So mongoUtil is able to load the data into csv in a second.


### How do we load this data into the database system? 
Run python3 front-end/mongoUtil.py


### Do you have some scripts to do that? If yes, how do we execute them?
Yes, run python3 front-end/mongoUtil.py


### Did you use some tools for loading? If yes, what are they? Provide appropriate details and links. 



### If you are benchmarking different database systems, did you make changes to the configurations? If yes, what are they?
N/A


### If you are generating your own data, how do we generate it?
N/A


## Application and code

### Which programming language(s) and version(s) are you using (Python, Java 8, C++, etc.)?

For machine learning and loading database, we used python v-3.7.
For front-end and server connection, we used JavaScript


### List the third-party libraries needed to execute your code and how do we install them (For ex. MySQL/neo4j connector for Python)

For front end, they are under requirments.txt.   
under front-end folder run $ pip install -r requirements.txt  and $ npm install

For back end, we used Mongoose, express, bodyParser, and they are listed in package.json
under server folder, run $ npm install

For machine learning part, we used sklearn to train model; we used pandas and numpy for data framewokr; we used folium to build interactive heatmap; we also used flask to run a web session for machine learning code. 


### If you have a GUI, how do we run it?

For machine learning part, you need to open another terminal for new flask session:   
First, in the new terminal, go to front-end/public/API document in terminal, run "export FLASK_APP=api.py" to wrap the code in a flask app.   
Second, in the new terminal, run "flask run", to start running flask.   
Third, in the application interface, find the "Get ML prediction" input box, and enter all parameters in boxes. Then, click "predict". The app will open a new window (sometimes behind the window of the app) which shows an interactive map of the target area.   
![](instruction_files/img4.png)


### Anything else we need to know about running your application?
![](instruction_files/img2.png)

For the machine learning part, you need to train the model locally, because the pre-trained model is too big to be uploaded on GitHub (about 130Mb). To train a model, you need to go to front-end/public/API and run python script "MachineLearning.py". This will take about 20 seconds to train a model. After having the trained model, you can run the API and start using the machine learning function.
![](instruction_files/img3.png)

## Code Documentation and References

### Did you use some code from GitHub or other sources? If yes provide the link.
we followed this tutorial to build back end query and schema https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66

### If you used some online code, what changes did you make to the code?

### Give a list of files in your submission which are written by you.
front-end/main.py  
front-end/mongoUtil.py  
front-end/queryMongo.py  
front-end/README.md  
instructions.md  
front-end/src/api.js  
front-end/src/api2.js  
front-end/src/App.css  
front-end/src/index.css  
front-end/src/index.js  
front-end/src/main.js  
front-end/src/components/MapChart.js  
front-end/src/components/ML.js  
front-end/src/components/MongoQuery.js  
front-end/src/components/test.js  
front-end/src/components/Timeline.js  
front-end/src/components/userInput.js  
front-end/src/components/Workspace.js  
server/index.js  
server/controllers/accident-ctrl.js  
server/controllers/county-ctrl.js  
server/db/index.js  
server/models/accidentModel.js  
server/models/countyModel.js  
server/routes/accident-router.js  
server/routes/county-router.js  
front-end/public/API/MachineLearning.py  
front-end/public/API/LoadModel.py  
front-end/src/components/LoadModel.py  
front-end/public/API/api.py  
front-end/DataCleaning.ipynb  
front-end/DataPreparation.ipynb  
front-end/DataPreprocess.ipynb  



### Feel free to include images of your application’s working in Readme/Instructions file.


* before run this project, make sure you have mongodb installed
1. install pip: https://pip.pypa.io/en/stable/installing/
2. under front-end folder run $ pip install -r requirements.txt
3. kaggle authentication api token: https://www.kaggle.com/docs/api 
5. run python mongoUtil.py to download the data into the mongodb
* first run server. under /server, run $ nodemon index.js
* Then under/front-end run $ npm start
* server is listening on 4000 port
* click show button, console will print all counties and ID
* http://localhost:4000/counties will show all counties with ID
* http://localhost:4000/accidents will show fulton accidents but very slow

## Code Documentation and References：
https://codesandbox.io/s/usa-counties-choropleth-map-quantile-2gi36?from-embed：reference on how to draw heat map  
https://recharts.org/en-US/: reference on how to draw graph, chart ... visualization  
https://github.com/kitze/react-electron-example: referenece on how to set up Electron + React application
