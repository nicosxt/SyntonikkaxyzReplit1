#!/bin/bash

# Remove git lock file if it exists
if [ -f .git/index.lock ]; then
    echo "Removing git lock file..."
    rm -f .git/index.lock
fi

# Wait a moment for any git processes to finish
sleep 2

# Add all changes
git add .

# Commit with your message
git commit -m "first milestone, framework done"

# Push to remote
git push

echo "Commit completed successfully!"