# Start from the latest golang base image
FROM golang:1.21.3

LABEL author="Mauricio Milano"
LABEL description="jobsity challenge"
LABEL version="1.0"


WORKDIR /frontend/
# COPY go.mod ./go.mod
COPY go.mod ./ 

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

COPY main.go main.go
RUN go mod download



CMD ["go","run","main.go"]