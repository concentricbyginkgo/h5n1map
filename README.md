# README

    npm run build

to create the /out/ dir with the static site inside.
to test, you can use something like node http-server inside that directory.

# Data

this app will use backup data in /public/data/ if the data is not available in the bucket

please put the bucket link in the .env file

main.py is currently just the skeleton of a lambda function, it needs some work.


# Notes

For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes
