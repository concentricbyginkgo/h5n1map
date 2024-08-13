import pandas as pd
import json
import numpy as np
import geopy
from geopy.geocoders import Nominatim


# data files
animal = './combined_h5n1_animal_surveillance_data.csv'
human = './H5N1_human_surveillance_data.csv'
statecodes = './states.csv'
countycodes = './countycodes.csv'

def data_summary(sheet, title = None):
    print(' --------------------------------- ')
    if title:
        print(title + '\n')

    print('columns:\n', sheet.columns)

    print('\nuniques per column:\n')

    for col in sheet.columns:
        num_uniques = sheet[col].nunique()
        print(col, ':', num_uniques)
        if 0 < num_uniques < 10:
            print(sheet[col].unique())



# read data
animal_data = pd.read_csv(animal) 
#data_summary(animal_data, 'Animal Data')

human_data = pd.read_csv(human)
#data_summary(human_data, 'Human Data')

statecodes_data = pd.read_csv(statecodes)
countycodes_data = pd.read_csv(countycodes)

# remove "APHIS - HPAI Detections in " from the source column
animal_data['source'] = animal_data['source'].str.replace('APHIS - HPAI Detections in ', '')
animal_data['source'] = animal_data['source'].str.replace('APHIS - HPAI Detections in ', '')

# change 'Mammals' source to 'Wildlife' 
animal_data['source'] = animal_data['source'].str.replace('Mammals', 'Wildlife')
# replace 'Livestock' with 'Dairy Farms' 
animal_data['source'] = animal_data['source'].str.replace('Livestock', 'Dairy Farms')
# replace 'Commercial and Backyard Flocks' with 'Poultry Farms'
animal_data['source'] = animal_data['source'].str.replace('Commercial and Backyard Flocks', 'Poultry Farms')

# change unicode hyphens to normal hyphens
animal_data['county'] = animal_data['county'].str.replace('–', '-')


# change Clarke County to Clark County, only in washington
clarkwa = animal_data[(animal_data['county'] == 'Clarke') & (animal_data['state'] == 'Washington')]
animal_data.loc[(animal_data['county'] == 'Clarke') & (animal_data['state'] == 'Washington'), 'county'] = 'Clark'

# change Stutsman and Dickey South Dakota to North Dakota
# find stutsman
animal_data.loc[animal_data['county'] == 'Stutsman', 'state'] = 'North Dakota'
animal_data.loc[animal_data['county'] == 'Dickey', 'state'] = 'North Dakota'
# change Kewanee to Kewaunee
animal_data['county'] = animal_data['county'].str.replace('Kewanee', 'Kewaunee')

# sometimes a space in DeSoto and LaSalle (there are more than one) 
#Louisiana De Soto
animal_data.loc[(animal_data['county'] == 'DeSoto') & (animal_data['state'] == 'Louisiana'), 'county'] = 'De Soto'
# ms and fl DeSoto
animal_data.loc[(animal_data['county'] == 'De Soto') & (animal_data['state'] == 'Mississippi'), 'county'] = 'DeSoto'
animal_data.loc[(animal_data['county'] == 'De Soto') & (animal_data['state'] == 'Florida'), 'county'] = 'DeSoto'

#Illinois LaSalle
animal_data.loc[(animal_data['county'] == 'La Salle') & (animal_data['state'] == 'Illinois'), 'county'] = 'LaSalle'

#Texas and louisiana La Salle
animal_data.loc[(animal_data['county'] == 'LaSalle') & (animal_data['state'] == 'Texas'), 'county'] = 'La Salle'
animal_data.loc[(animal_data['county'] == 'LaSalle') & (animal_data['state'] == 'Louisiana'), 'county'] = 'La Salle'

#Matanuska Susitna to Matanuska-Susitna
animal_data['county'] = animal_data['county'].str.replace('Matanuska Susitna', 'Matanuska-Susitna')

# Chugach to Valdez-Cordova, as they were split in 2019
animal_data['county'] = animal_data['county'].str.replace('Chugach', 'Valdez-Cordova')

# Matanuska-Sustina to Matanuska-Susitna
animal_data['county'] = animal_data['county'].str.replace('Matanuska-Sustina', 'Matanuska-Susitna')

# Saint Croix to St Croix
animal_data['county'] = animal_data['county'].str.replace('Saint Croix', 'St Croix')

# St. Mary to St Mary
animal_data['county'] = animal_data['county'].str.replace('St. Mary', 'St Mary')

# Rensselear to Rensselaer
animal_data['county'] = animal_data['county'].str.replace('Rensselear', 'Rensselaer')

# Wanship to Summit (Wanship is a census-designated place in Summit County, Utah)
animal_data.loc[(animal_data['county'] == 'Wanship') & (animal_data['state'] == 'Utah'), 'county'] = 'Summit'

# replace Macon Ohio with Brown ( macon is a region in brown county)
animal_data.loc[(animal_data['county'] == 'Macon') & (animal_data['state'] == 'Ohio'), 'county'] = 'Brown'


# replace michigan with Michigan
animal_data['state'] = animal_data['state'].str.replace('michigan', 'Michigan')


# state : 51, 50 states and DC
# print('51 states in animal data:')
# print(animal_data[~animal_data['state'].isin(statecodes_data['state'])]['state'].unique()) # is DC, we have a county code for it 11001

# we can remove guid column, it represents the same as year
human_data['event'] = human_data['event'].str.replace('Novel Influenza A (H5N1)_United States_', '')
human_data.drop('event_guid', axis=1, inplace=True)

# can remove these columns, its all influenza
human_data.drop(['disease', 'pathogen'], axis=1, inplace=True)


# change date reported to match animal data
human_data.rename(columns={'date_reported': 'date_detected'}, inplace=True)
# if date high or low matches reported, set to none

# can remove this column because all US
human_data.drop('country', axis=1, inplace=True)

# rename admin areato state
human_data.rename(columns={'administrative_area_level_1': 'state'}, inplace=True)


# create a source column for human and fill with "Human"
human_data['source'] = 'Human'

# add countys to human data, we need to reverse geocode the lat and long into a lookup table
latlon = {} 
user_agent = 'h5n1map'
# format: https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>
# zoom	address detail
# 3	country
# 5	state
# 8	county
for index, row in human_data.iterrows():
    if f"{row['latitude']}, {row['longitude']}" not in latlon:
        geolocator = Nominatim(user_agent=user_agent)
        location = geolocator.reverse(f"{row['latitude']}, {row['longitude']}", zoom=8)
        county, state, country = str(location).split(', ')
        latlon[f"{row['latitude']}, {row['longitude']}"] = (county, state)

    # add county and state to human data
    human_data.loc[index, 'county'] = latlon[f"{row['latitude']}, {row['longitude']}"][0]
    human_data.loc[index, 'state'] = latlon[f"{row['latitude']}, {row['longitude']}"][1]

if len(latlon) == 0:
    raise ValueError('No lat lon data found')

# compile the human and animal data
combined_data = pd.concat([animal_data, human_data], ignore_index=True)

# add state abbreviations column to combined data
combined_data = combined_data.merge(statecodes_data, left_on='state', right_on='state', how='left')
combined_data.drop('state', axis=1, inplace=True)

# Standardize county names in countycodes_data
remove = [' City and Borough', ' County', ' Borough', ' Parish', ' Municipality', ' City', ' Census Area', '.', ' city', ' town', ' village', ' Municipio',]
for r in remove:
    countycodes_data['county'] = countycodes_data['county'].str.replace(r, '')
    combined_data['county'] = combined_data['county'].str.replace(r, '')
countycodes_data['county'] = countycodes_data['county'].str.strip().str.lower()

# remove periods from the county codes sheet
countycodes_data['county'] = countycodes_data['county'].str.replace('.', '')

# Ensure county codes are 5 char strings, prepend 0 if necessary
countycodes_data['id'] = countycodes_data['id'].astype(str)
countycodes_data['id'] = countycodes_data['id'].apply(lambda x: x.zfill(5))



# Standardize county names in combined_data
combined_data['county'] = combined_data['county'].str.strip().str.lower()


# Merge combined_data with countycodes_data
combined_data = combined_data.merge(countycodes_data, left_on=['county', 'abbreviation'], right_on=['county', 'abbreviation'], how='left')
# report any that nan county
print(combined_data[combined_data['county'].isna()])

# re capitalize the county names
combined_data['county'] = combined_data['county'].str.title()
       

# Identify columns with NaN values
nan_columns = combined_data.columns[combined_data.isna().any()].tolist()

# Cast these columns to object dtype
combined_data[nan_columns] = combined_data[nan_columns].astype(object)

# Replace NaN with empty string
combined_data.fillna('', inplace=True)
            

# Write the combined data to a CSV
combined_data.to_csv('./combined_data.csv', index=False)

# make a json file with this heirarchy: county -> source -> list of data
json_data = {}
sources = combined_data['source'].unique()

for county, county_data in combined_data.groupby('id'):
    json_data[county] = {}
    for source in sources:
        json_data[county][source] = []

    # set name to county_data name from id
    json_data[county]['name'] = county_data['county'].iloc[0]



# Write each row to its corresponding county and source
for index, row in combined_data.iterrows():
    county = row['id']
    source = row['source']

    
    # Convert the row to a comma-separated string
    row_str = ','.join(row.astype(str))

    
    if county == '':
        if row.source != 'Dairy Farms':
            print(row)
            print(index)
            raise ValueError('county is empty')

    
    # Initialize the nested dictionary if it doesn't exist
    if county not in json_data:
        json_data[county] = {}
    if source not in json_data[county]:
        json_data[county][source] = []
    
    # Append the row string to the list
    json_data[county][source].append(row_str)
    

# Write the dictionary to a JSON file
with open('./combined_data.json', 'w') as f:
    json.dump(json_data, f, indent=4)