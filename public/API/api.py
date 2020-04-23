import LoadModel
from flask import Flask, Response, request

import hashlib

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def dynamic_page():
	if request.method == "POST":
		temp=request.form['temp']
		humi=request.form['humi']
	return LoadModel.main(temp,humi)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)

