# Complete Docker Commands Guide for Nxt-Trendz

## Quick Start Commands

### 🚀 Run the App (Production)

```bash
# Start the app in the background
docker-compose up -d

# Start the app and see logs in real-time
docker-compose up

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs nxt-trendz

# Follow logs (live updates)
docker-compose logs -f nxt-trendz

# Stop the app
docker-compose down

# Stop and remove all data
docker-compose down -v
```

### 🔧 Run the App (Development with Hot Reload)

```bash
# Start development mode
docker-compose --profile dev up -d nxt-trendz-dev

# View development logs
docker-compose logs -f nxt-trendz-dev

# Stop development mode
docker-compose down
```

---

## Container Management Commands

### Check Container Status

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Show container size
docker ps -a -s

# Show specific container info
docker ps --filter "name=nxt-trendz"
```

### Container Information

```bash
# Get detailed container info
docker inspect nxt-trendz-app

# Get IP address of container
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nxt-trendz-app

# View container logs (last 10 lines)
docker logs nxt-trendz-app --tail 10

# View logs with timestamps
docker logs -t nxt-trendz-app

# Follow logs in real-time
docker logs -f nxt-trendz-app

# View logs with a timestamp filter (last 30 minutes)
docker logs --since 30m nxt-trendz-app
```

### Start/Stop/Restart Containers

```bash
# Start a stopped container
docker start nxt-trendz-app

# Stop a running container
docker stop nxt-trendz-app

# Restart a container
docker restart nxt-trendz-app

# Kill a container (force stop)
docker kill nxt-trendz-app

# Remove a container
docker rm nxt-trendz-app

# Remove all stopped containers
docker container prune
```

### Execute Commands in Container

```bash
# Run a command in running container
docker exec nxt-trendz-app ls -la

# Open interactive shell in container
docker exec -it nxt-trendz-app sh

# Run npm command in container
docker exec nxt-trendz-app npm list

# Check Node version in container
docker exec nxt-trendz-app node --version

# Run a test
docker exec nxt-trendz-app npm test
```

---

## Image Management Commands

### Check Images

```bash
# List all images
docker images

# List images with full details
docker images -a

# Show image size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Search for images
docker search node
```

### Build Images

```bash
# Build image from Dockerfile
docker build -t nxt-trendz:latest .

# Build without cache
docker build --no-cache -t nxt-trendz:latest .

# Build for specific platform
docker build --platform linux/amd64 -t nxt-trendz:latest .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t nxt-trendz:latest .

# Build from docker-compose
docker-compose build

# Rebuild without cache
docker-compose build --no-cache
```

### Remove Images

```bash
# Remove an image
docker rmi nxt-trendz:latest

# Remove all unused images
docker image prune

# Remove all images (danger!)
docker rmi $(docker images -q)
```

### Tag Images

```bash
# Tag an image
docker tag nxt-trendz:latest myusername/nxt-trendz:v1.0

# Push to registry
docker push myusername/nxt-trendz:v1.0
```

### Inspect Images

```bash
# View image details
docker inspect nxt-trendz:latest

# View image history
docker history nxt-trendz:latest

# Show image layers
docker image inspect nxt-trendz:latest --format='{{json .RootFS.Layers}}'
```

---

## Docker Compose Commands

### Basic Operations

```bash
# Build services
docker-compose build

# Build and start services
docker-compose up

# Start services in background
docker-compose up -d

# Start specific service
docker-compose up -d nxt-trendz

# Stop services
docker-compose stop

# Start stopped services
docker-compose start

# Restart services
docker-compose restart

# Pause services
docker-compose pause

# Unpause services
docker-compose unpause

# Stop and remove containers
docker-compose down

# Stop, remove containers, volumes, networks
docker-compose down -v

# Remove images too
docker-compose down --rmi all
```

### Service Management

```bash
# List services
docker-compose ps

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs nxt-trendz

# Follow logs
docker-compose logs -f

# View last 50 lines
docker-compose logs --tail 50

# Follow most recent 20 lines
docker-compose logs -f --tail 20
```

### Execute Commands

```bash
# Run command in service
docker-compose exec nxt-trendz npm list

# Open shell in service
docker-compose exec nxt-trendz sh

# Run one-off command
docker-compose run nxt-trendz npm test
```

### Configuration

```bash
# Validate compose file
docker-compose config

# Show compose file
docker-compose config --resolve-image-digests

# List services
docker-compose ps --services
```

---

## Volume & Data Management Commands

### Volume Operations

```bash
# List all volumes
docker volume ls

# Create a volume
docker volume create my-volume

# Inspect a volume
docker volume inspect my-volume

# Remove unused volumes
docker volume prune

# Remove a specific volume
docker volume rm my-volume
```

### Backup & Restore

```bash
# Backup container
docker commit nxt-trendz-app nxt-trendz:backup

# Export container
docker export nxt-trendz-app > nxt-trendz.tar

# Import container
docker import nxt-trendz.tar nxt-trendz:imported
```

---

## Network Commands

### Network Management

```bash
# List networks
docker network ls

# Create custom network
docker network create my-network

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network

# Connect container to network
docker network connect my-network nxt-trendz-app

# Disconnect container from network
docker network disconnect my-network nxt-trendz-app
```

---

## System & Cleanup Commands

### System Information

```bash
# Show Docker version
docker version

# Show Docker info
docker info

# Show Docker stats (resource usage)
docker stats

# Show CPU/Memory usage of containers
docker stats --no-stream

# Show resource usage (one-time)
docker stats --no-stream nxt-trendz-app
```

### Cleanup & Maintenance

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove ALL unused resources (containers, images, networks, volumes)
docker system prune

# Remove ALL unused resources including volumes
docker system prune -a --volumes

# Show disk usage
docker system df
```

---

## Nxt-Trendz Specific Commands

### Production Mode

```bash
# Start production app
docker-compose up -d

# Check if running
docker ps | grep nxt-trendz

# View app logs
docker logs nxt-trendz-app -f

# Check app health
docker inspect --format='{{.State.Health.Status}}' nxt-trendz-app

# Restart app
docker-compose restart nxt-trendz

# Stop app
docker-compose stop nxt-trendz

# Stop and remove everything
docker-compose down
```

### Development Mode

```bash
# Start dev server with hot reload
docker-compose --profile dev up -d nxt-trendz-dev

# Watch dev logs
docker-compose logs -f nxt-trendz-dev

# Stop dev server
docker-compose down

# Rebuild dev image
docker-compose --profile dev build --no-cache nxt-trendz-dev
```

### Troubleshooting

```bash
# Check container logs
docker logs nxt-trendz-app

# Check detailed logs
docker logs -f nxt-trendz-app

# Execute shell in container
docker exec -it nxt-trendz-app sh

# Check if port 3000 is accessible
docker exec nxt-trendz-app wget -q -O- http://localhost:3000

# Check Node version
docker exec nxt-trendz-app node -v

# Check npm version
docker exec nxt-trendz-app npm -v

# List files in container
docker exec nxt-trendz-app ls -la /app

# View environment variables
docker exec nxt-trendz-app env
```

---

## Advanced Commands

### Docker Build & Tag

```bash
# Build with custom tag
docker build -t nxt-trendz:latest -t nxt-trendz:v1.0.0 .

# Build and push to registry
docker build -t myrepo/nxt-trendz:latest . && docker push myrepo/nxt-trendz:latest

# Build multi-stage
docker build --target builder -t nxt-trendz:builder .
```

### Docker Compose Advanced

```bash
# Scale services (run multiple instances)
docker-compose up -d --scale nxt-trendz=3

# View compose file with variable substitution
docker-compose config

# Run service with different entrypoint
docker-compose run nxt-trendz sh

# Run one-time service
docker-compose run --rm nxt-trendz npm test

# Validate and view processed compose file
docker-compose -f docker-compose.yml config
```

### Environment Variables

```bash
# Pass environment variables on command line
docker run -e NODE_ENV=production -e REACT_APP_API_URL=https://api.example.com nxt-trendz:latest

# Load environment from file
docker run --env-file .env.production nxt-trendz:latest

# Override in compose
docker-compose -e NODE_ENV=production up -d
```

### Port Mapping

```bash
# Map custom port
docker run -p 8080:3000 nxt-trendz:latest

# Map multiple ports
docker run -p 3000:3000 -p 3001:3001 nxt-trendz:latest

# Map all exposed ports
docker run -P nxt-trendz:latest

# Check port mappings
docker port nxt-trendz-app
```

---

## Common Workflows

### Deploy a New Version

```bash
# Build new image
docker-compose build --no-cache

# Stop current version
docker-compose down

# Start new version
docker-compose up -d

# Verify
docker-compose logs -f nxt-trendz
```

### Debug Issues

```bash
# View logs
docker-compose logs -f

# Open shell in container
docker-compose exec nxt-trendz sh

# Check resource usage
docker stats nxt-trendz-app

# Inspect container
docker inspect nxt-trendz-app
```

### Backup Before Updates

```bash
# Create image snapshot
docker commit nxt-trendz-app nxt-trendz:backup-$(date +%s)

# Export container
docker export nxt-trendz-app > backup-$(date +%Y%m%d).tar

# List backups
docker images | grep nxt-trendz:backup
```

### Performance Monitoring

```bash
# Real-time stats
docker stats

# Memory usage only
docker stats --format "table {{.Container}}\t{{.MemUsage}}"

# CPU usage
docker stats --format "table {{.Container}}\t{{.CPUPerc}}"

# Show running processes
docker top nxt-trendz-app
```

---

## Tips & Tricks

### Quick Aliases (PowerShell)

```powershell
# Add to PowerShell profile
Set-Alias dc docker-compose
Set-Alias d docker
```

### Common Issues & Solutions

```bash
# Port already in use
docker-compose down
netstat -ano | findstr :3000  # View process using port
taskkill /PID <PID> /F        # Kill process

# Container won't start
docker-compose logs nxt-trendz  # Check logs
docker-compose up              # Run without -d to see errors

# Out of disk space
docker system prune -a          # Clean up everything

# Network issues
docker network ls               # Check networks
docker-compose restart          # Restart services
```

### Performance Tips

```bash
# Use .dockerignore to reduce build context
# Use multi-stage builds to reduce image size
# Use alpine images for smaller footprint
# Layer caching - put stable layers before volatile ones
```

---

## Quick Reference Cheat Sheet

| Task | Command |
|------|---------|
| Start App | `docker-compose up -d` |
| Stop App | `docker-compose down` |
| View Logs | `docker-compose logs -f` |
| Open Shell | `docker-compose exec nxt-trendz sh` |
| Rebuild | `docker-compose build --no-cache` |
| Check Status | `docker ps` |
| Check Health | `docker inspect --format='{{.State.Health.Status}}' nxt-trendz-app` |
| View Disk Usage | `docker system df` |
| Clean Up | `docker system prune` |
| View Images | `docker images` |
| Remove Image | `docker rmi nxt-trendz:latest` |
| Run Command | `docker exec nxt-trendz-app <command>` |
| Dev Mode | `docker-compose --profile dev up -d nxt-trendz-dev` |

---

## Access the App

- **Production**: http://localhost:3000
- **Development**: http://localhost:3001

## Help & Documentation

- Docker Docs: https://docs.docker.com/
- Docker Compose Docs: https://docs.docker.com/compose/
- Docker CLI Reference: https://docs.docker.com/engine/reference/commandline/cli/
