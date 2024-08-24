# Run app and volume

    docker-compose up -d --build

    docker-compose down

# Development

    docker-compose up db -d --build
    
    npm run dev
    
# IMPORTANT

you NEED an .env, with these vars and whatever values:
    
    POSTGRES_USER=PostUser
    POSTGRES_PASSWORD=GresPass
    POSTGRES_DB=db
    DB_PORT=5432
    PORT=3000
    AUTH_USER=absolutelyanadmin
    AUTH_ID=123456789
    AUTH_PASS=definitelyADefiantPassword
    AUTH_HASH='$argon2id$v=19$m=19456,t=2,p=1$6mY6WaY9C69h/tolDXlz3Q$CqzmvLOVmarVaaiuVnGPcOoWUKl2cWpLPiSC3qj9VPo'

unfortunately, the hash is hardcoded because I used argon2id, but you can just run a node script to generate the hash from any password you want.
the hardcoded login in your ENV should NOT be the above if this is live

# Notes

database is kept in a volume, which can be removed with:

    docker-compose down -v

but this will revert the database to its initial state, removing sessions and any users you may have added.

For the U.S. Census county codes (FIPS codes) used in this file to identify individual counties, see this link:

https://www2.census.gov/geo/docs/reference/codes/files/national_county.txt

County codes used in this file can also be found on Wikimedia Commons at this link:
https://commons.wikimedia.org/wiki/File_talk:Usa_counties_large.svg/county_codes
