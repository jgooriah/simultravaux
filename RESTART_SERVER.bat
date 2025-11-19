@echo off
echo ================================================
echo    REDEMARRAGE DU SERVEUR AVEC CLAUDE API
echo ================================================
echo.

echo [1/3] Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Nettoyage du cache Next.js...
cd /d "%~dp0"
if exist ".next" (
    rmdir /s /q ".next"
    echo Cache supprime.
) else (
    echo Pas de cache a supprimer.
)

echo [3/3] Demarrage du serveur avec Claude API...
echo.
echo ================================================
echo  Le serveur va demarrer. Regardez les logs pour:
echo  [OK] "CLAUDE API ACTIVEE" 
echo  [KO] "MODE DEMO"
echo ================================================
echo.

start cmd /k "cd /d "%~dp0" && pnpm dev"

echo.
echo FAIT ! Le serveur demarre dans une nouvelle fenetre.
echo Attendez 10 secondes puis testez: http://localhost:3000/chat
echo.
pause

