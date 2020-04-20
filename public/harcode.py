import csv
import datetime
import random
import random
from datetime import datetime, timedelta


# or a function
def gen_datetime(min_year=2017, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1, 00, 00, 00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return start + (end - start) * random.random()

with open('unemployment-by-county-2017.csv','r') as csvinput:
    with open('sample3.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row.append('date')
        all.append(row)

        for row in reader:
            row.append(gen_datetime())
            all.append(row)

        writer.writerows(all)