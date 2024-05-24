#!/bin/bash

# Usage: ./1-create-docker-image.sh ecom-app-container ecom-app-image 1.0.0 dev abc123

# This script is used to create a Docker image.

# Get the container name from the first argument.
CONTAINER_NAME=$1

# Get the image name from the first argument.
IMAGE_NAME=$2

# Get the major, minor, and patch version numbers from the second argument.
VERSION=$3

# Get the environment from the third argument.
ENVIRONMENT=$4

# Get the commit SHA from the fourth argument.
COMMIT_SHA=$5

# Get the current timestamp.
TIMESTAMP=$(date +%Y-%m-%d-%H-%M)

# Print out the variables to ensure they're correct.
echo "Container name: $CONTAINER_NAME"
echo "Image name: $IMAGE_NAME"
echo "Version: $VERSION"
echo "Environment: $ENVIRONMENT"
echo "Commit SHA: $COMMIT_SHA"
echo "Timestamp: $TIMESTAMP"

# Export the variables so they can be used by the docker-compose command.
export CONTAINER_NAME
export IMAGE_NAME
export VERSION
export ENVIRONMENT
export COMMIT_SHA
export TIMESTAMP


# Check if the container exists
if docker ps -a --format '{{.Names}}' | grep -Eq "^$CONTAINER_NAME$"; then
    # Container exists, so remove it
    docker rm -f "$CONTAINER_NAME"
    echo "Container $CONTAINER_NAME removed."
else
    echo "Container $CONTAINER_NAME does not exist."
fi

# Define the image name pattern
IMAGE_PATTERN="$IMAGE_NAME:*"
echo "Image pattern: $IMAGE_PATTERN"

# Check if any images match the pattern
if docker image inspect $(docker images -q --filter=reference="$IMAGE_PATTERN") &> /dev/null; then
    # Images exist, so remove them
    docker rmi -f $(docker images -q --filter=reference="$IMAGE_PATTERN")
    echo "Images matching pattern $IMAGE_PATTERN removed."
else
    echo "No images matching pattern $IMAGE_PATTERN exist."
fi


# Run docker-compose
docker-compose -f ../ecom-app/docker-compose.yml up --build

# Wait for the container to start. sleep for 5 seconds
sleep 5

# Define the URL of the NestJS API endpoint to test
API_URL="http://localhost:3000/api/v1/users"

# Make a GET request to the API endpoint
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL")

# Check the HTTP response code
if [ "$response" -eq 200 ]; then
    echo "API $API_URL endpoint is reachable."
else
    echo "Unable to reach API endpoint. HTTP response code: $response"
fi

# Define your Docker Hub username and password
USERNAME="bayareala8s"
TOKEN="************"

# Login to the Docker registry
docker login --username=$USERNAME --password=$TOKEN


# Tag the Docker image with the repository name
docker tag ${IMAGE_NAME}:${VERSION}-${ENVIRONMENT}-${TIMESTAMP}-${COMMIT_SHA} $USERNAME/${IMAGE_NAME}:${VERSION}-${ENVIRONMENT}-${TIMESTAMP}-${COMMIT_SHA}


sleep 5

# Push the Docker image to the registry.
docker push $USERNAME/${IMAGE_NAME}:${VERSION}-${ENVIRONMENT}-${TIMESTAMP}-${COMMIT_SHA}