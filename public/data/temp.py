import pandas as pd
import json

# data files
animal = './combined_h5n1_animal_surveillance_data.csv'
animal_data = pd.read_csv(animal) 

# print all unique values in species_or_flock_type column
# ONLY for APHIS - HPAI Detections in Mammals
print(animal_data[animal_data['source'] == 'APHIS - HPAI Detections in Mammals']['species_or_flock_type'].unique())