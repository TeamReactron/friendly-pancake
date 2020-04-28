# friendly-pancake
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
