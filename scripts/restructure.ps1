#!/usr/bin/env pwsh
# Restructuring script for Hospital Management System

# Set working directory to repo root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir

# Create all required directories if they don't exist
$dirs = @(
    "client\src",
    "client\src\app\core\guards",
    "client\src\app\core\interceptors",
    "client\src\app\models",
    "client\src\app\features\auth",
    "client\src\app\features\dashboard",
    "client\src\app\features\patients",
    "client\src\app\features\appointments",
    "client\src\app\features\doctors",
    "server\scripts",
    "server\config",
    "server\controllers",
    "server\middleware",
    "server\models",
    "server\routes",
    "server\utils",
    "scripts"
)

Write-Host "Creating directory structure..." -ForegroundColor Green
foreach ($dir in $dirs) {
    $fullPath = Join-Path -Path $repoRoot -ChildPath $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -Path $fullPath -ItemType Directory -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Cyan
    }
}

# Copy current frontend files to client directory
Write-Host "Moving Angular app files to client directory..." -ForegroundColor Green

# List of directories/files to move to client folder
$dirsToMove = @(
    "src",
    "angular.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.spec.json",
    "tailwind.config.js",
    "postcss.config.js"
)

foreach ($item in $dirsToMove) {
    $source = Join-Path -Path $repoRoot -ChildPath $item
    $destination = Join-Path -Path $repoRoot -ChildPath "client\$item"
    
    if (Test-Path $source) {
        # If it's a directory, use robocopy, else use copy-item
        if ((Get-Item $source) -is [System.IO.DirectoryInfo]) {
            # Check if destination exists and is not empty
            if (Test-Path $destination) {
                if ((Get-ChildItem $destination -Force | Measure-Object).Count -gt 0) {
                    Write-Host "  Skipping: $item - Destination already has files" -ForegroundColor Yellow
                    continue
                }
            }
            
            # Use robocopy for directories
            robocopy $source $destination /E /NP /NFL /NDL /NJH /NJS
            Write-Host "  Moved: $item to client directory" -ForegroundColor Cyan
        } else {
            # Use copy-item for files
            Copy-Item -Path $source -Destination $destination -Force
            Write-Host "  Moved: $item to client directory" -ForegroundColor Cyan
        }
    } else {
        Write-Host "  Not found: $item" -ForegroundColor Yellow
    }
}

# Move server test scripts
Write-Host "Moving server test scripts..." -ForegroundColor Green
$serverScripts = @(
    "check-appointments.js",
    "list-collections.js",
    "create-appointment.js",
    "create-test-data.js",
    "test-mongo.js"
)

foreach ($script in $serverScripts) {
    $source = Join-Path -Path $repoRoot -ChildPath "server\$script"
    $destination = Join-Path -Path $repoRoot -ChildPath "server\scripts\$script"
    
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $destination -Force
        Write-Host "  Moved: $script to server/scripts" -ForegroundColor Cyan
    } else {
        Write-Host "  Not found: $script" -ForegroundColor Yellow
    }
}

Write-Host "Restructuring completed successfully!" -ForegroundColor Green
Write-Host "Review the RESTRUCTURE_PLAN.md document for next steps to complete manually." -ForegroundColor Yellow 