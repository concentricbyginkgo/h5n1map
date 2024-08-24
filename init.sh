#!/bin/bash
set -e

# Create the database with init.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/init.sql

echo "Creating user: $AUTH_USER with id: $AUTH_ID and password: $AUTH_HASH"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    INSERT INTO auth_user (id, username, password_hash) VALUES ('$AUTH_ID', '$AUTH_USER', '$AUTH_HASH');
EOSQL