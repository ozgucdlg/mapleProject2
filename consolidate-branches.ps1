# PowerShell script to consolidate branches
# Navigate to the project directory
cd C:\Users\ozguc\angular-workspace\mapleProject2\hospital-management

# Create a new branch called main from the current master branch
git checkout -b main

# Push the main branch to GitHub, forcing it to replace the remote main branch
git push -f origin main:main

# Set main as the default branch for the local repository
git config --local init.defaultBranch main

# Delete the master branch from the remote repository
git push origin --delete master

Write-Host "Branch consolidation complete. The repository now has only the 'main' branch." 