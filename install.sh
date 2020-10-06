#!/bin/bash

# Get model from google drive

YOLACT_PTH_ID="1NFJQVP_h1WaXfV8ZfhVz6HJwKd2f6r7w"
EDGE_CONNECT_PTH_ID="1IrlFQGTpdQYdPeZIEgGUaSFpbYtNpekA"

YOLACT_URL="https://docs.google.com/uc?export=download&id=$YOLACT_PTH_ID"
YOLACT_PTH_DIRECTORY="./yolact/weights"
YOLACT_SAVE_PATH="./yolact/weights/yolact_base_54_000000.pth"

EDGE_CONNECT_URL="https://docs.google.com/uc?export=download&id=$EDGE_CONNECT_PTH_ID"
EDGE_CONNECT_DIRECTORY='./edge-connect/checkpoints'

echo "Downloading YOLACT model..."
mkdir -p $YOLACT_PTH_DIRECTORY
FILE="$(curl -sc /tmp/gcokie "${YOLACT_URL}" | grep -o '="uc-name.*</span>' | sed 's/.*">//;s/<.a> .*//')" 
curl -Lb /tmp/gcokie "${YOLACT_URL}&confirm=$(awk '/_warning_/ {print $NF}' /tmp/gcokie)" -o "$YOLACT_PTH_DIRECTORY/${FILE}" && rm -rf /tmp/gcokie
rm $FILE

echo "Downloading Edge-connect model..."
mkdir -p $EDGE_CONNECT_DIRECTORY
FILE="$(curl -sc /tmp/gcokie "${EDGE_CONNECT_URL}" | grep -o '="uc-name.*</span>' | sed 's/.*">//;s/<.a> .*//')" 
curl -Lb /tmp/gcokie "${EDGE_CONNECT_URL}&confirm=$(awk '/_warning_/ {print $NF}' /tmp/gcokie)" -o "$EDGE_CONNECT_DIRECTORY/${FILE}"  && rm -rf /tmp/gcokie

echo "Extracting Edge-connect model..."
cd $EDGE_CONNECT_DIRECTORY
unzip $FILE
rm $FILE
