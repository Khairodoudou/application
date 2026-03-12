@echo off
echo ==========================================
echo      REPARATION DE LA BASE DE DONNEES
echo ==========================================
echo.
echo ATTENTION : Veuillez arreter le serveur (Ctrl+C) AVANT de continuer.
echo.
pause
echo.
echo 1. Generation du client Prisma...
call npx prisma generate
echo.
echo ==========================================
echo      REPARATION TERMINEE
echo ==========================================
echo.
echo Vous pouvez maintenant relancer 'npm run dev'.
pause
