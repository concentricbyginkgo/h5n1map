## README

Run this:

    npm run build

to create the /out/ dir with the static site inside.
To test, use node http-server package, run two servers after building:

    cd .\out\
    http-server -p 3000

and 

    cd .\lambdabucket\
    http-server-p 3001 --cors -c-1

## Data

This app will use hardcoded backup data in /public/data/ if the data URL from the .env is not available to be fetched.

# S3 setup!

all the content for the bucket is in the [lambdabucket](/lambdabucket/) directory.

[main.py](/lambdabucket/main.py) is currently just the skeleton of a lambda function, it needs some variables:

    s3_client: needs to be a properly configured boto instance

    sourceBucket: the name of the source bucket (private, triggers the lambda)

    destinationBucket: the name of the dest bucket (publicly readable)

To get this running, you will need a source bucket and a destination bucket, and they should be different to avoid invoking when a new upload is added.

The source bucket needs all the .csv's in [./lambdabucket](/lambdabucket/)

The destination bucket needs to be publicly readable
(Best practice for this is to route through cloudfront for CDN, probably unnecessary)

The [.env](.env) also needs the destination bucket's public link, building the nextJS app relies upon it.

Put the bucket names into [main.py](/lambdabucket/main.py), and into [.env](.env).

The permission policy should include s3 GetObject and PutObject for source and dest respectively.

The lambda function needs the trigger set to S3 All object create event.

# Notes

For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes
