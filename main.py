from bs4 import BeautifulSoup
from flask import *
from zipcode import listingsFromZipcode
from randomZipcode import randomZipcode
import numpy as np
import requests
import shutil
import os
import re
import sys
app = Flask(__name__, template_folder='./')

####################################################################################
	# TODO: Clean-up code + encapsulation
	# TODO: Update read-me (so ugly)
	# TODO: Data analysis
	# TODO: Front-end polishing
####################################################################################

hdr = {
    "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36" ,
    'referer':'https://www.google.com/'
}

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

@app.route("/")
def start():
	main()
	return render_template("index.html")

# Clear data.txt
@app.route("/finished", methods=['POST', "GET"])
def main():
	open('static/files/data.txt', 'w').close()
	app.logger.info('hello')
	for i in range(5):
		while True:
			# Edge case where listingsFromZipcode yields a NoneType object
			while True:
				zipcode = randomZipcode()
				listings = listingsFromZipcode(str(zipcode))
				if listings is not None:
					break
			# Edge case where there is only 1 listing, the random function yields an error (rand(0,0))
			if len(listings) == 1:
				randomIndex = 0
			else:
				randomIndex = np.random.randint(0, len(listings)-1)
			zpid = listings['id'][randomIndex]
			address = listings['address'][randomIndex]
			beds = listings['beds'][randomIndex]
			baths = listings['baths'][randomIndex]
			area = listings['area'][randomIndex]
			price = listings['price'][randomIndex]

			# Go through while loop again when beds is NoneType object (non-house listing)
			if(beds is not None):
				break
		print("\n", zpid, "\n", address,"\n", beds, "\n", baths, "\n", price, "\n", area)
		zillowURL = "https://www.zillow.com/homedetails/"+zpid+"_zpid/"
		imageArray = []
		imageArray = URLtoImageArray(zillowURL)
		file = open("static/files/data.txt", "a")
		datastring = str(len(imageArray))+"\n"+str(address)+"\n"+str(beds)+"\n"+str(baths)+"\n"+str(price)+"\n"+str(area)+"\n"
		file.write(datastring)
		currentDirectory = os.getcwd()
		path = os.path.join(currentDirectory, 'static/files/Images/set'+str(i))
		# delete all images in Image folder prior to calling image URLs
		filelist = [ f for f in os.listdir(path)]
		for f in filelist:
			os.remove(os.path.join(path, f))
		# loop through imageArray and save the image URLs to the Image folder
		for index, images in enumerate(imageArray):
			fname = images.split('/')[-1]
			fname = str(index)+".jpg"
			r = requests.get(images,headers=hdr,stream=True,timeout=5)
			if r.status_code == 200:
				with open(os.path.join(path,fname),'wb') as f:
					r.raw.decode_content = True
					shutil.copyfileobj(r.raw,f)
	return render_template("index.html")
if __name__ == "__main__":
	app.run(debug = True)
