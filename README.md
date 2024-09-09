# H5N1 Map

H5N1 interactive map that can be embedded in other websites. Created for use by marketing.

# Simplest Path:

    npm run dev

# build static site in /h5n1-map/

    npm run build

Run this:

    npm run build

to create the /h5n1-map/h5n1-map/ dir with the static site inside.
To test, use node http-server package, run two servers after building:

    cd .\h5n1-map\
    http-server -p 3000 

will serve the static site on localhost:3000/h5n1-map
and

    cd .\lambdabucket\
    http-server -p 3001 --cors -c-1

will host the files at http://localhost:3001/, which can be used for testing by changing the .env file to point to this before building.

## Data

This app will use hardcoded backup data in /public/data/ if the data URL from the .env is not available to be fetched.
The link in .env does need a trailing slash
and, there is an option to hide the last updated date if the fetch succeeds.

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

### Build and Deploy

1. Run `npm run build`
1. Copy the contents of the `h5n1-map` directory to the S3 bucket `biosecurity-canopy-production-public` and directory `h5n1-map`
1. Test at https://public.ginkgobiosecurity.com/h5n1-map

### Update the dataset

1. Data is updated from any upload to the source bucket
1. Data can have a lot of spelling errors, which block matching to a county code. I decided against fuzzy matching to avoid false positives, so we can just drop and report these errors.
1. The lambda funtion could be updated with more exceptions, but it is probably better to just fix the data.

1. Build and test locally
1. Use npm run dev to prototype,
2. Try to npm run build, and then launch the two simple servers to test the built product.

1. Build and deploy to prod
1. npm run build, and then copy the contents of the h5n1-map directory (the static site) to the S3 bucket.

## Misc Notes

For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes
