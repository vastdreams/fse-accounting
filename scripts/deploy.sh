#!/bin/bash
# PATH: scripts/deploy.sh
# PURPOSE: Deployment script for FSE Accounting

set -e

echo "🚀 Starting FSE Accounting deployment..."

# Configuration
PROJECT_DIR="/home/ubuntu/fse-accounting"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"

# Pull latest code
echo "📥 Pulling latest code..."
cd $PROJECT_DIR
git pull origin main

# Backend deployment
echo "🐍 Deploying backend..."
cd $BACKEND_DIR

# Create/activate virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Restart backend service
echo "🔄 Restarting backend service..."
sudo systemctl restart fse-backend

# Frontend deployment
echo "⚛️ Deploying frontend..."
cd $FRONTEND_DIR

# Install dependencies
npm ci

# Build
npm run build

# Restart frontend with PM2
echo "🔄 Restarting frontend..."
pm2 restart fse-frontend || pm2 start npm --name "fse-frontend" -- start

# Reload nginx
echo "🔄 Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment complete!"
echo ""
echo "📊 Service status:"
sudo systemctl status fse-backend --no-pager -l
pm2 status

