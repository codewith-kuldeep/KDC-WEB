@echo off
title Élan Physiotherapy Platform - Dev Server
echo ========================================================
echo  Starting ÉLAN PHYSIO - Luxury Kinetic Rehabilitation
echo ========================================================
echo.
cd /d "%~dp0"
call npm run dev
pause
