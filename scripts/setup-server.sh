#!/bin/bash
# PATH: scripts/setup-server.sh
# PURPOSE: Initial server setup for FSE Accounting on Ubuntu EC2

set -e

echo "🔧 Setting up FSE Accounting server..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y \
    python3 python3-pip python3-venv \
    nodejs npm \
    nginx \
    postgresql-client \
    git \
    certbot python3-certbot-nginx

# Install PM2 for Node.js process management
sudo npm install -g pm2

# Create project directory
sudo mkdir -p /home/ubuntu/fse-accounting
sudo chown ubuntu:ubuntu /home/ubuntu/fse-accounting

# Clone repository (update with your repo URL)
cd /home/ubuntu
git clone https://github.com/your-org/fse-accounting.git fse-accounting

# Setup backend
cd /home/ubuntu/fse-accounting/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create systemd service for backend
sudo tee /etc/systemd/system/fse-backend.service > /dev/null <<EOF
[Unit]
Description=FSE Accounting Backend
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/fse-accounting/backend
Environment="PATH=/home/ubuntu/fse-accounting/backend/venv/bin"
EnvironmentFile=/home/ubuntu/fse-accounting/backend/.env
ExecStart=/home/ubuntu/fse-accounting/backend/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 127.0.0.1:8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable fse-backend

# Setup frontend
cd /home/ubuntu/fse-accounting/frontend
npm ci
npm run build

# Setup nginx
sudo cp /home/ubuntu/fse-accounting/nginx.conf /etc/nginx/sites-available/fse-accounting
sudo ln -sf /etc/nginx/sites-available/fse-accounting /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Setup SSL with Let's Encrypt (update domain)
# sudo certbot --nginx -d fseaccounting.com -d www.fseaccounting.com

# Start services
sudo systemctl start fse-backend
pm2 start npm --name "fse-frontend" -- start -- -p 3000
pm2 save

echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env file to /home/ubuntu/fse-accounting/backend/.env"
echo "2. Run: sudo certbot --nginx -d fseaccounting.com -d www.fseaccounting.com"
echo "3. Restart services: sudo systemctl restart fse-backend && pm2 restart all"

