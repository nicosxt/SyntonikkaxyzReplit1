#!/bin/bash

# Backup current work
cp -r . /tmp/portfolio_backup

# Remove problematic git directory
rm -rf .git

# Initialize fresh git repository
git init
git config user.name "nicosxt"
git config user.email "syntonikka@gmail.com"

# Add remote repository
git remote add origin https://github.com/nicosxt/SyntonikkaxyzReplit1.git

# Stage all files except screenshots
git add --all
git reset HEAD attached_assets/Screenshot*.png 2>/dev/null || true

# Commit with your message
git commit -m "first milestone, framework done"

# Push to GitHub
git push -u origin main

echo "Successfully pushed to GitHub!"