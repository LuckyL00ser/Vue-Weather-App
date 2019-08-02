npm run build
cd dist
git init
git add -A
git commit -m'deploy'
git push -f
git push -f git@github.com:LuckyL00ser/vue-weather-app.git master:gh-pages