#!/usr/bin/env python3
import os
import base64
import json
import urllib.request
import urllib.parse

def upload_file_to_github(repo_owner, repo_name, file_path, github_token):
    """Upload a file to GitHub repository using the GitHub API"""
    
    # Read file content
    with open(file_path, 'rb') as f:
        content = f.read()
    
    # Encode content as base64
    encoded_content = base64.b64encode(content).decode('utf-8')
    
    # Prepare API request
    api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}"
    
    data = {
        "message": "first milestone, framework done",
        "content": encoded_content
    }
    
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    try:
        req = urllib.request.Request(api_url, 
                                   data=json.dumps(data).encode('utf-8'), 
                                   headers=headers, 
                                   method='PUT')
        
        with urllib.request.urlopen(req) as response:
            print(f"✓ Uploaded {file_path}")
            return True
    except Exception as e:
        print(f"✗ Failed to upload {file_path}: {e}")
        return False

# Key files to upload
key_files = [
    "package.json",
    "client/src/App.tsx", 
    "client/src/pages/Home.tsx",
    "client/src/pages/CaseStudies.tsx",
    "client/src/pages/Services.tsx",
    "client/src/pages/Info.tsx",
    "server/index.ts",
    "README.md"
]

print("Manual upload script created. Replace TOKEN_HERE with your GitHub token and run:")
print("python3 upload_to_github.py")