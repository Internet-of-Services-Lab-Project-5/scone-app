#!/bin/bash

# Declare the app entrypoint
ENTRYPOINT="node /app/app.js"

# Declare image related variables
IMG_NAME=iosl-pupd
IMG_FROM=samchamani/iosl-pupd:1.0.0
IMG_TO=samchamani/${IMG_NAME}:1.0.0-debug

docker pull registry.scontain.com:5050/sconecuratedimages/node:14.4.0-alpine3.11

# Run the sconifier to build the TEE image based on the non-TEE image
docker run -it --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            registry.scontain.com:5050/scone-production/iexec-sconify-image:5.7.5-v8 \
            sconify_iexec \
            --name=${IMG_NAME} \
            --from=${IMG_FROM} \
            --to=${IMG_TO} \
            --binary-fs \
            --fs-dir=/app \
            --host-path=/etc/hosts \
            --host-path=/etc/resolv.conf \
            --binary=/usr/local/bin/node \
            --heap=1G \
            --dlopen=1 \
            --no-color \
            --verbose \
            --command=${ENTRYPOINT} \
            && echo -e "\n------------------\n" \
            && echo "successfully built TEE docker image => ${IMG_TO}" \
            && echo "application mrenclave.fingerprint is $(docker run --rm -e SCONE_HASH=1 ${IMG_TO})"