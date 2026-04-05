@echo off
echo ================================================
echo  Dayton Relo Website Setup
echo ================================================
echo.

cd /d "%~dp0"
echo Working in: %CD%
echo.

echo [1/3] Installing dependencies...
npm install
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm install failed. Make sure Node.js is installed.
    pause
    exit /b 1
)
echo Done!
echo.

echo [2/3] Staging all files for git...
git add -A
git commit -m "Initial Next.js website - Dayton Relo"
echo Done!
echo.

echo [3/3] Pushing to GitHub...
git push
if %ERRORLEVEL% neq 0 (
    echo.
    echo Could not push automatically. 
    echo Run these commands manually:
    echo   git remote add origin YOUR_GITHUB_REPO_URL
    echo   git push -u origin main
)
echo.

echo ================================================
echo  Setup complete! 
echo  Now go to vercel.com and import this repo.
echo ================================================
pause
