#!/bin/bash

# Script to push Angular Signals Ticket Dashboard to GitHub
# Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
    echo "❌ Error: GitHub username required"
    echo "Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="angular-signals-ticket-dashboard"

echo "🚀 Setting up repository for GitHub..."
echo ""

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add remote repository
echo "📦 Adding remote repository..."
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

# Rename branch to main if on master
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "🔄 Renaming branch from master to main..."
    git branch -M main
    BRANCH="main"
else
    BRANCH=$CURRENT_BRANCH
fi

echo ""
echo "✅ Repository configured!"
echo ""
echo "📋 Next steps:"
echo "1. Create the repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: ${REPO_NAME}"
echo "   - Description: Modern Ticket Management Dashboard built with Angular 19, Signals, and PrimeNG"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo "2. After creating the repository, run:"
echo "   git push -u origin ${BRANCH}"
echo ""
echo "Or run this command now (will fail if repo doesn't exist yet):"
read -p "Push to GitHub now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin ${BRANCH}
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Repository URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    else
        echo ""
        echo "❌ Push failed. Make sure you've created the repository on GitHub first."
        echo "   Then run: git push -u origin ${BRANCH}"
    fi
fi

