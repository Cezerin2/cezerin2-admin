#!/bin/sh
set -e

# setup with environment variables
npm run build

#start nginx
nginx -g "daemon off;"
