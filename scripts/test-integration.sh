#!/bin/sh
set -e

setup_database() {
    echo "Creating database container..."
    docker run --name test-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    sleep 5
    echo "Database container is running."
}

export DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/test
docker start test-postgres || setup_database
npx prisma migrate reset --force
npx prisma db push
npx jest ./tests --setupFilesAfterEnv ./tests/setup.ts --runInBand
unset DATABASE_URL
docker stop test-postgres