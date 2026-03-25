@echo off
chcp 65001 >nul
title CaféFinanzas HN — Setup APK Android
color 1F
echo.
echo  ╔════════════════════════════════════════════╗
echo  ║     CaféFinanzas HN — Generador de APK    ║
echo  ╚════════════════════════════════════════════╝
echo.

:: Verificar Node.js
echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Node.js no encontrado.
    echo  Descarga desde: https://nodejs.org
    pause & exit /b
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo  OK — Node.js %NODE_VER%

:: Crear proyecto Vite
echo.
echo [2/6] Creando proyecto React con Vite...
if exist cafefinanzas-apk (
    echo  Carpeta ya existe, usando la existente...
) else (
    call npm create vite@latest cafefinanzas-apk -- --template react --yes
    if %errorlevel% neq 0 (
        echo  ERROR creando proyecto. Intenta de nuevo.
        pause & exit /b
    )
)
cd cafefinanzas-apk

:: Instalar dependencias
echo.
echo [3/6] Instalando dependencias (2-3 min)...
call npm install
call npm install xlsx
call npm install @capacitor/core @capacitor/cli @capacitor/android

:: Copiar App.jsx
echo.
echo [4/6] Verificando App.jsx...
if not exist src\App.jsx (
    echo.
    echo  ══════════════════════════════════════════════
    echo  ACCION REQUERIDA:
    echo  1. Se abrira la carpeta src
    echo  2. Copia el archivo cafefinanzas-hn-v4.jsx ahi
    echo  3. Renombralo a App.jsx
    echo  4. Vuelve aqui y presiona cualquier tecla
    echo  ══════════════════════════════════════════════
    explorer src
    pause
)

:: Compilar
echo.
echo [5/6] Compilando para produccion...
call npm run build
if %errorlevel% neq 0 (
    echo  ERROR en compilacion. Verifica que App.jsx este correcto.
    pause & exit /b
)

:: Inicializar Capacitor
echo.
echo [6/6] Configurando Capacitor para Android...
call npx cap init "CafeFinanzas HN" "com.cafefinanzas.hn" --web-dir dist
call npx cap add android
call npx cap copy android
call npx cap sync android

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  LISTO! Abriendo Android Studio...         ║
echo  ║                                            ║
echo  ║  En Android Studio:                        ║
echo  ║  Build → Build APK → Build APK(s)          ║
echo  ║  El APK estara en:                         ║
echo  ║  android\app\build\outputs\apk\debug\      ║
echo  ╚════════════════════════════════════════════╝
echo.
call npx cap open android
pause
