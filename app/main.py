from bs4 import BeautifulSoup
from flask import *
import numpy as np
import requests
import re
import json
import pandas as pd
from time import *
from faker import Faker
fake = Faker()
app = Flask(__name__, template_folder="../templates", static_folder="../static")

####################################################################################
	# TODO: Clean-up code + encapsulation
	# TODO: Update read-me (so ugly)
	# TODO: Front-end polishing
####################################################################################
hdr = {
	"user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36" ,
	'referer':'https://www.google.com/'
}
def listingsFromZipcode(zipcode):
	url1 = 'https://www.zillow.com/homes/for_sale/'+zipcode
	with requests.Session() as s:
		r1 = s.get(url1, headers=hdr)
		param = re.search(r'!--(\{"queryState".*?)-->', r1.text)
		if param is None:
			return None
		else:
			data1 = json.loads(param.group(1))
	data_list = [data1]
	try:
		if len(data1['cat1']['searchResults']['listResults']) == 0:
			return listingsFromZipcode(str(fake.postcode()))
	except:
		return listingsFromZipcode(str(fake.postcode()))
	df = pd.DataFrame()
	def make_frame(frame):
		for i in data_list:
			for item in i['cat1']['searchResults']['listResults']:
				frame = frame.append(item, ignore_index=True)
		return frame
	df = make_frame(df)
	df = df.drop_duplicates(subset='zpid', keep="last")
	return df[['id', 'address', 'beds', 'baths', 'area', 'price']]

def HTMLFromURL(url):
	html_page = requests.get(url, headers=hdr, timeout=15)
	soup = BeautifulSoup(html_page.content, 'html.parser')
	return str(soup.encode("utf-8"))

def URLtoImageArray(zillowURL):
	imageArray = []
	regex = r'https:\\[\w/\.\\-]+?1008.jpg'
	for m in re.finditer(regex, HTMLFromURL(zillowURL)):
		imageArray.append(m.group(0))
	
	for i in range(len(imageArray)):
		imageArray[i] = imageArray[i].replace("\\", "")
	imageArray = set(imageArray)
	imageArray = list(imageArray)
	return imageArray

hdr = {
	"user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36" ,
	'referer':'https://www.google.com/'
}
@app.route("/")
def start():
	return main()

@app.route("/finished", methods=['POST', "GET"])
def main():
	app.logger.info('Hello! From Python')
	dictionaryImages={}
	dictionaryListingInfo={}
	for i in range(5):
		while True:
			# Edge case where listingsFromZipcode yields a NoneType object
			while True:
				randomZipcode = fake.postcode()
				listings = listingsFromZipcode(str(randomZipcode))
				if listings is not None:
					break
			# Edge case where there is only 1 listing, the random function yields an error (rand(0,0))
			if len(listings) == 1:
				randomIndex = 0
			else:
				randomIndex = np.random.randint(0, len(listings)-1)
			key = 'set'+str(i)
			zpid = listings['id'][randomIndex]
			address = listings['address'][randomIndex]
			beds = listings['beds'][randomIndex]
			baths = listings['baths'][randomIndex]
			area = listings['area'][randomIndex]
			price = listings['price'][randomIndex]
			dictionaryListingInfo[str((key,'address'))] = str(address)
			dictionaryListingInfo[str((key,'beds'))] = str(beds)
			dictionaryListingInfo[str((key,'baths'))] = str(baths)
			dictionaryListingInfo[str((key,'area'))] = str(area)
			dictionaryListingInfo[str((key,'price'))] = str(price)

			# Go through while loop again when beds is NoneType object (non-house listing)
			if(beds is not None):
				break
		print("\n", zpid, "\n", address,"\n", beds, "\n", baths, "\n", price, "\n", area)
		zillowURL = "https://www.zillow.com/homedetails/"+zpid+"_zpid/"
		imageArray = []
		imageArray = URLtoImageArray(zillowURL)
		dictionaryImages[key]=imageArray
	return render_template("index.html", 
	dictionaryImages = dictionaryImages, 
	dictionaryListingInfo = dictionaryListingInfo)
	
if __name__ == "__main__":
	app.run(debug = True, host="0.0.0.0", port=5000)