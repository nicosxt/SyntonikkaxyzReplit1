#!/bin/bash

# Set up git credentials using your token
git config --global credential.helper store

# Create the credentials file with your token
echo "https://nicosxt:${GITHUB_TOKEN}@github.com" > ~/.git-credentials

# Add the remote (ignore errors if it exists)
git remote add origin https://github.com/nicosxt/syntonikka2025.git 2>/dev/null || true

# Set the remote URL 
git remote set-url origin https://github.com/nicosxt/syntonikka2025.git 2>/dev/null || true

# Stage all changes
git add .

# Commit with your message
git commit -m "first milestone, framework done"

# Push to GitHub
git push -u origin main

echo "Successfully pushed to GitHub!"