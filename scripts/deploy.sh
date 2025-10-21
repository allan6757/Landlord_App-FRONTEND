#!/bin/bash

set -e

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t propmanager:latest .

# Tag for production
docker tag propmanager:latest propmanager:$(git rev-parse --short HEAD)

echo "✅ Deployment preparation complete!"
echo "Docker images ready:"
docker images | grep propmanager