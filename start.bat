@echo off
REM WANG Bingqi Portfolio — 本地开发启动
REM 网站已部署到 Cloudflare Pages，本地只用于编辑预览

echo Starting dev server...
start "Portfolio-Dev" /MIN cmd /c "npm --prefix E:\Code\项目1-作品集网站 run dev"
timeout /t 4 /nobreak >nul
echo.
echo Dev server: http://localhost:5173
echo.
echo 编辑完运行 build 后，把 dist\ 上传到 Cloudflare Pages 即可。
pause
