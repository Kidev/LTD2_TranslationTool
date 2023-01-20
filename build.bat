mkdir build/
mkdir -p build/firefox
mkdir -p build/chrome

cp -r common/* build/firefox/
cp -r common/* build/chrome/
cp -r firefox/* build/firefox/
cp -r chrome/* build/firefox/