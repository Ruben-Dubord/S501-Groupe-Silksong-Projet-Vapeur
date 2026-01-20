import os
import pandas as pd
import urllib.request

"""
Ce script permet aux développeurs de récupérer des fichiers image depuis internet vers un répertoire local à partir d'une base de données JSON.
"""

# Charger la base de données des jeux depuis le fichier JSON
database = pd.read_json("./src/database/games.json")
# Répertoire où stocker les images
image_dir = "./src/assets/images/GameImages/"

print("Démarrage de la récupération des images...")

# Parcourir chaque ligne de la base de données
for index, row in database.iterrows():
    image_url = row['HeaderImage']  # URL de l'image
    image_name = f"{row['AppID']}.jpg"  # Nom du fichier image basé sur l'AppID
    image_path = image_dir + image_name  # Chemin complet du fichier
    # Télécharger seulement si l'image n'existe pas ou si l'URL est HTTP (pour forcer le téléchargement)
    if image_name not in os.listdir(image_dir) or image_url.startswith("http"):
        urllib.request.urlretrieve(image_url, image_path)
        # Remplacer l'URL par le chemin local dans la base de données
        database.replace(image_url, image_path, inplace=True)

# Sauvegarder la base de données mise à jour
database.to_json("./src/database/games.json", orient="records", indent=2)

print("Récupération des images terminée.")