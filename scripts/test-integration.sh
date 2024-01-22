#!/bin/sh
set -e
export DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/test
docker start test-postgres
npx prisma migrate reset --force
npx prisma db push
npx jest ./tests --setupFilesAfterEnv ./tests/setup.ts --runInBand
unset DATABASE_URL
docker stop test-postgres