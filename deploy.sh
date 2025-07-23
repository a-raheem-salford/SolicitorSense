#!/bin/bash
echo "Building frontend..."
npm run build

echo "Creating deployment package..."
zip -r out.zip out/

echo "Uploading to EC2..."
scp -i SolicitorSense.pem out.zip ubuntu@13.60.54.84:/home/ubuntu/

echo "Updating EC2..."
ssh -i SolicitorSense.pem ubuntu@13.60.54.84 '
cd /home/ubuntu
unzip -o out.zip
rm -rf SolicitorSenseAPI/public/*
cp -r out/* SolicitorSenseAPI/public/
cd SolicitorSenseAPI
pm2 restart solicitorsense-fullstack
pm2 status
'

echo "Deployment complete!"
echo "Visit: http://13.60.54.84:4000"
