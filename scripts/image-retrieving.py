import os
import pandas as pd
import urllib.request

"""
This script allows the developers to retrieve image file from internet into a local directory from a json database.
"""

database = pd.read_json("./src/database/games.json")
image_dir = "./src/assets/images/GameImages/"

print("Starting image retrieval...")

for index, row in database.iterrows():
    image_url = row['HeaderImage']
    image_name = f"{row['AppID']}.jpg"
    image_path = image_dir + image_name
    if image_name not in os.listdir(image_dir) or image_url.startswith("http"):
        urllib.request.urlretrieve(image_url, image_path)
        database.replace(image_url, image_path, inplace=True)

database.to_json("./src/database/games.json", orient="records", indent=2)

print("Image retrieval completed.")