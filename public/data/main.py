import pandas as pd

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
# source,state,county,species_or_flock_type,flock_size,hpai_strain,outbreak_date,date_detected,date_collected,date_confirmed,woah_classification,sampling_method,submitting_agency
# State is in long format
# county does not have " County" at the end
# date is in format month/day/year
data_summary(animal_data, 'Animal Data')

human_data = pd.read_csv(human)
# event,event_guid,disease,pathogen,date_occurred_low_end,date_occurred_high_end,date_reported,country,administrative_area_level_1,cases,confirmed_cases,suspected_cases,probable_cases,deaths,confirmed_deaths,suspected_deaths,probable_deaths,cuml_cases,cuml_confirmed_cases,cuml_suspected_cases,cuml_probable_cases,cuml_deaths,cuml_confirmed_deaths,cuml_suspected_deaths,cuml_probable_deaths,source,latitude,longitude
# administrative_area_level_1 is state in name format
# date is in format year-month-day
data_summary(human_data, 'Human Data')

statecodes_data = pd.read_csv(statecodes)
# "State","Abbreviation"

countycodes_data = pd.read_csv(countycodes)
# state,county,id
# state is in abbreviation, most countys have " County" at the end

# --------------------------------- 
# Animal Data


# uniques per column:

# source : 4
# ['APHIS - HPAI Detections in Mammals'
#  'APHIS - HPAI Detections in Livestock'
#  'APHIS - HPAI Detections in Wild Birds'
#  'APHIS – HPAI Detections in Commercial and Backyard Flocks']
# remove "APHIS - HPAI Detections in " from the source column
animal_data['source'] = animal_data['source'].str.replace('APHIS - HPAI Detections in ', '')
animal_data['source'] = animal_data['source'].str.replace('APHIS - HPAI Detections in ', '')

# state : 51
# Print the state that is not in the statecodes_data, probably DC
print('51 states in animal data:')
print(animal_data[~animal_data['state'].isin(statecodes_data['State'])]['state'].unique()) # is DC, we have a county code for it 11001

# county : 1016
# species_or_flock_type : 257
# flock_size : 508
# hpai_strain : 10
# outbreak_date : 373
# date_detected : 419
# date_collected : 710
# date_confirmed : 39
# woah_classification : 3
# [nan 'Wild bird' 'Captive wild bird' 'Wild Bird']
# sampling_method : 5
# [nan 'Morbidity/Mortality' 'Agency harvest' 'Live bird' 'Hunter harvest'
#  'Hunter Harvest']
# set Hunter harvest to Hunter Harvest
# submitting_agency : 133
#  ---------------------------------
# Human Data


# uniques per column:

# event : 2
# ['Novel Influenza A (H5N1)_United States_2022'
#  'Novel Influenza A (H5N1)_United States_2023'] 
# event_guid : 2
# ['6b52cc4f-1197-41be-abf8-5d6410423eec'
#  '3457ddf3-06c1-40e2-862d-2f7456a4b718']
# every guid corresponds to the same event, every 2022 == 6b52... and every 2023 == 3457dd...
print('event column mirrors event_guid column:')
# print all unique for group
for group in human_data.groupby('event'):
    print(group[0])
    print(group[1]['event_guid'].unique())

# is true, we can remove guid column
human_data['event'] = human_data['event'].str.replace('Novel Influenza A (H5N1)_United States_', '')
human_data.drop('event_guid', axis=1, inplace=True)

# disease : 1
# ['Influenza']
# pathogen : 1
# ['Novel Influenza A (H5N1)']
# can remove these columns
human_data.drop(['disease', 'pathogen'], axis=1, inplace=True)

# date_occurred_low_end : 5
# ['2022-04-20' '2024-05-21' '2024-05-22' '2024-06-26' '2024-03-27']
# date_occurred_high_end : 5
# ['2022-04-20' '2024-05-21' '2024-05-25' '2024-06-26' '2024-03-27']
# date_reported : 5
# change date reported to match animal data
human_data.rename(columns={'date_reported': 'date_detected'}, inplace=True)
# ['2022-04-29' '2024-05-24' '2024-05-31' '2024-07-05' '2024-04-05']
# if date high or low matches reported, set to none

# country : 1
# ['United States']
# can remove this column
human_data.drop('country', axis=1, inplace=True)

# administrative_area_level_1 : 3
# ['Colorado' nan 'Michigan' 'Texas']
# rename to state
human_data.rename(columns={'administrative_area_level_1': 'state'}, inplace=True)

# cases : 1
# [ 1. nan]
# confirmed_cases : 1
# [ 1. nan]
# suspected_cases : 0
# probable_cases : 0
# deaths : 1
# [ 0. nan]
# confirmed_deaths : 0
# suspected_deaths : 0
# probable_deaths : 0
# cuml_cases : 4
# [1 2 3 4]
# cuml_confirmed_cases : 4
# [1 2 3 4]
# cuml_suspected_cases : 0
# cuml_probable_cases : 0
# cuml_deaths : 1
# [0]
# cuml_confirmed_deaths : 0
# cuml_suspected_deaths : 0
# cuml_probable_deaths : 0
# source : 1
# ['CDC Weekly US Influenza Surveillance Report']
# latitude : 4
# [39.5500507 37.09024   44.3148443 31.9685988]
# longitude : 4
# [-105.7820674  -95.712891   -85.6023643  -99.9018131]

# create a source column for human and fill with "Human"
human_data['source'] = 'Human'

latlon = {
    '39.5500507, -105.7820674': ('Colorado', 'Summit'),
    '37.09024, -95.712891': ('New Jersey', 'Morris'),
    '44.3148443, -85.6023643': ('Michigan', 'Wexford'),
    '31.9685988, -99.9018131': ('Texas', 'Runnels')
}

# add countys to human data
human_data['county'] = human_data.apply(lambda row: latlon[f"{row['latitude']}, {row['longitude']}"][1], axis=1)

# compile the human and animal data
combined_data = pd.concat([animal_data, human_data], ignore_index=True)

# add state abbreviations column to combined data
combined_data = combined_data.merge(statecodes_data, left_on='state', right_on='State', how='left')
combined_data.drop('State', axis=1, inplace=True)

# remove the " County" from the county codes sheet
countycodes_data['county'] = countycodes_data['county'].str.replace(' County', '')

# Ensure county codes are strings
countycodes_data['id'] = countycodes_data['id'].astype(str)

# Rename the state column in countycodes_data to avoid conflict
countycodes_data.rename(columns={'state': 'Abbreviation'}, inplace=True)

# Merge combined_data with countycodes_data
combined_data = combined_data.merge(countycodes_data, left_on=['county', 'Abbreviation'], right_on=['county', 'Abbreviation'], how='left')

# Drop the state_code column if it's no longer needed
combined_data.drop('Abbreviation', axis=1, inplace=True)

#remove any columns that are all null
combined_data.dropna(axis=1, how='all', inplace=True)

# Write the combined data to a CSV
combined_data.to_csv('./combined_data.csv', index=False)