@echo off
cd /d "C:\Users\wolfb\Documents\Claude\Projects\Set up open clay discord\dayton-relo-website"

echo Current remote:
git remote -v

echo.
echo Configuring git user...
git config user.email "chris@cjohio.com"
git config user.name "Chris"

echo.
echo Adding all files...
git add -A

echo.
echo Committing...
git commit -m "Deploy Next.js Dayton Relo website"

echo.
echo Force pushing to GitHub (replacing old static site)...
git push origin main --force

if %ERRORLEVEL% neq 0 (
    echo.
    echo Push failed. Trying with master branch...
    git push origin HEAD:main --force
)

echo.
echo Done! Check Vercel for the new deployment.
pause
