import csv 
import json 
import collections
import urllib.parse
import urllib.request
orderedDict = collections.OrderedDict()
from collections import OrderedDict


def invokeWikifier(text, lang="en", threshold=0.8):

    # Prepare the URL.
    data = urllib.parse.urlencode([
        ("text", text), ("lang", lang),
        ("userKey", "ajfykkzodmgidqavxtiyyeololqwux"),
        ("pageRankSqThreshold", "%g" % threshold), ("applyPageRankSqThreshold", "true"),
        ("nTopDfValuesToIgnore", "200"), ("nWordsToIgnoreFromList", "200"),
        ("wikiDataClasses", "true"), ("wikiDataClassIds", "false"),
        ("support", "true"), ("ranges", "false"), ("minLinkFrequency", "2"),
        ("includeCosines", "false"), ("maxMentionEntropy", "3")
        ])
    url = "http://www.wikifier.org/annotate-article"

    # Call the Wikifier and read the response.
    req = urllib.request.Request(url, data=data.encode("utf8"), method="POST")
    with urllib.request.urlopen(req, timeout = 60) as f:
        response = f.read()
        response = json.loads(response.decode("utf8"))

    return list(map(lambda x: dict( term= x["title"], url = x["url"] ), response["annotations"]))    

# Function to convert a CSV to JSON
# Takes the file paths as arguments      
def make_json(csvFilePath, jsonFilePath):
    x = OrderedDict([('index', {})])      
    jsonString = json.dumps(x)  

    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf: 

        #get the json file and insert csv data into it.
        with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:

            #load csv file data using csv library's dictionary reader
            csvReader = csv.DictReader(csvf) 
            #convert each csv row into python dict
            # and add it to data
            for row in csvReader:
                row["wikifier_terms"] = invokeWikifier(row["text"]) 
                row["pdf"] = row["etd_file_id"]+".pdf"
                jsonf.write(jsonString)
                print("row", row)
                jsonf.write("\n")
                y = json.dumps(row)
                jsonf.write(y)
                jsonf.write("\n")

# Driver Code
 
# Decide the two file paths according to your
# computer system    
csvFilePath = r'metadata_abstract.csv'
jsonFilePath = r'metadata_abstract_output2.json'
make_json(csvFilePath, jsonFilePath)