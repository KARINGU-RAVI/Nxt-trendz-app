# Docker Setup Guide for Nxt-Trendz

This guide explains how to build and run the Nxt-Trendz application using Docker.

## Prerequisites

- Docker installed on your machine (https://docs.docker.com/get-docker/)
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

### Production Build (Optimized)

Build and run the production-optimized image:

```bash
# Build the Docker image
docker build -t nxt-trendz:latest .

# Run the container
docker run -p 3000:3000 nxt-trendz:latest
```

Then visit `http://localhost:3000` in your browser.

### Using Docker Compose (Recommended)

Build and run using docker-compose:

```bash
# Build and start the app
docker-compose up -d

# View logs
docker-compose logs -f nxt-trendz

# Stop the app
docker-compose down
```

## Development Mode with Hot Reload

To develop with hot reload functionality:

```bash
# Using docker-compose with dev profile
docker-compose --profile dev up -d nxt-trendz-dev

# The dev app will be available at http://localhost:3001

# View logs
docker-compose logs -f nxt-trendz-dev

# Stop the dev server
docker-compose down
```

## Docker Images Explained

### Dockerfile (Production)
- **Multi-stage build** for optimized image size
- Uses Node.js 18 Alpine Linux
- Installs dependencies with pnpm
- Builds the React app
- Serves with `serve` package
- Includes health checks
- Image size: ~200MB

### Dockerfile.dev (Development)
- Full development environment with `npm start`
- Hot reload support with file watching
- Includes build tools for development
- Used for development workflow

## Image Details

- **Base Image**: `node:18-alpine` - Lightweight Node.js image
- **Port**: 3000 (production) / 3001 (development)
- **Health Check**: Enabled to ensure app is running

## Benefits of Docker

✅ **Consistent Environment**: Eliminates "works on my machine" issues
✅ **Node Version Management**: Uses stable Node 18 LTS instead of system Node
✅ **No OpenSSL Issues**: Webpack 4 compatibility is built-in
✅ **Easy Deployment**: Same image runs in development, staging, and production
✅ **Isolation**: Dependencies are isolated from system

## Building for Different Platforms

### For Apple Silicon (M1/M2/M3)
```bash
docker build --platform linux/amd64 -t nxt-trendz:latest .
```

### For Linux ARM64
```bash
docker build --platform linux/arm64 -t nxt-trendz:latest .
```

## Environment Variables

You can pass environment variables when running the container:

```bash
docker run -p 3000:3000 \
  -e REACT_APP_API_URL=https://apis.ccbp.in \
  nxt-trendz:latest
```

## Pushing to Docker Hub

If you want to share your image:

```bash
# Tag the image
docker tag nxt-trendz:latest yourusername/nxt-trendz:latest

# Push to Docker Hub
docker login
docker push yourusername/nxt-trendz:latest
```

## Common Commands

```bash
# List all images
docker images

# List running containers
docker ps

# View container logs
docker logs <container-id>

# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# Remove an image
docker rmi nxt-trendz:latest

# Rebuild without cache
docker build --no-cache -t nxt-trendz:latest .
```

## Troubleshooting

### Port Already in Use
```bash
# If port 3000 is in use, map to a different port
docker run -p 8080:3000 nxt-trendz:latest
```

### Container Exits Immediately
```bash
# Check logs for errors
docker logs <container-id>

# Run interactively to see errors
docker run -it nxt-trendz:latest
```

### Volume Mount Issues (Dev Mode)
```bash
# For Windows, you may need to enable WSL 2
# WSL 2 setup: https://docs.docker.com/desktop/windows/wsl/
```

## Production Deployment

For production, you can push the image to a container registry and deploy to:
- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- Heroku (with Docker support)

Example for Docker Swarm:
```bash
docker stack deploy -c docker-compose.yml nxt-trendz
```

## Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Node.js Docker Images](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications/)
