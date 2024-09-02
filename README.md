# README

    npm run build

to create the /out/ dir with the static site inside.
to test, you can use the node http-server package, run it inside that directory.

# Data

this app will use backup data in /public/data/ if the data is not available in the bucket

# S3 setup!

all the content for the bucket is in [lambdabucket](/lambdabucket/)

main.py is currently just the skeleton of a lambda function, it needs some variables.

To get this running, you will want to create two buckets, with permissions set up.

You need a source bucket and a destination bucket, and they should be different
to avoid invoking when a new upload is added.

Put the bucket names into main.py, the lambda function.

Put the destination bucket link in the .env file

The permission policy should include s3 GetObject and PutObject.

The lambda function needs the trigger set to S3 All object create event.

# Notes

For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes
