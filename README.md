# Run app and volume

    docker-compose up -d --build

    docker-compose down

# Notes

database is kept in a volume, which can be removed with:

    docker-compose down -v

but this will revert the database to its initial state.


#  Use docker for just the nextjs app

    docker build -t nextjs-docker .

    docker run -p 3000:3000 nextjs-docker 

# Remove just this container

    docker rm -f $(docker ps -a -q --filter ancestor=nextjs-docker)


For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes