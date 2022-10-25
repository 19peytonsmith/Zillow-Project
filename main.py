from bs4 import BeautifulSoup
from zipcode import listingsFromZipcode
from randomZipcode import randomZipcode
import numpy as np
import requests
import shutil
import os
import re

####################################################################################
    # TODO: Use a random url of the ones listing down below?
    # TODO: Get rid of Lot/Land results
    # TODO: Scrap higher quality images from HTML (no more using *-p_d.jpg)
	# TODO: Clean-up code + encapsulation
	# TODO: Update read-me (so ugly)
    # TODO: FRONTEND!!
	# TODO: Run both programs at one click
	# TODO: Find another listing when correct
	# TODO: Data analysis
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
	regex = r'https:\\[\w/\.\\-]+?\-p_d.jpg'
	for m in re.finditer(regex, HTMLFromURL(zillowURL)):
		imageArray.append(m.group(0))
	
	for i in range(len(imageArray)):
		imageArray[i] = imageArray[i].replace("\\", "")
	imageArray = set(imageArray)
	imageArray = list(imageArray)
	file = open("length.txt", "w")
	file.write(str(len(imageArray)))
	return imageArray

if __name__ == "__main__":
	zipcode = randomZipcode()
	listings = listingsFromZipcode(str(zipcode))

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

	print("\n", zpid, "\n", address,"\n", beds, "\n", baths, "\n", area, "\n", price, "\n")
	zillowURL = "https://www.zillow.com/homedetails/"+zpid+"_zpid/"
	imageArray = []
	imageArray = URLtoImageArray(zillowURL)
	currentDirectory = os.getcwd()
	path = os.path.join(currentDirectory, 'Images')
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