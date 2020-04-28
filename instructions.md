# friendly-pancake
Data Preparation and Setup

Which database system(s) and version(s) are you using? How do we install it/them? (providing a link to official documentation will be enough)



How do we download the data you used for your project? Please do NOT submit ALL the data with your code (Submitting a very small portion (< 5 MB) so that we can run the demo might be okay)



How do we load this data into the database system? 


Do you have some scripts to do that? If yes, how do we execute them?



Did you use some tools for loading? If yes, what are they? Provide appropriate details and links. 



If you are benchmarking different database systems, did you make changes to the configurations? If yes, what are they?



If you are generating your own data, how do we generate it?


Application and code

Which programming language(s) and version(s) are you using (Python, Java 8, C++, etc.)?



List the third-party libraries needed to execute your code and how do we install them (For ex. MySQL/neo4j connector for Python)




If you have a GUI, how do we run it?



Anything else we need to know about running your application?

Code Documentation and References

Did you use some code from GitHub or other sources? If yes provide the link.


If you used some online code, what changes did you make to the code?

Give a list of files in your submission which are written by you.

Feel free to include images of your application’s working in Readme/Instructions file.


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
