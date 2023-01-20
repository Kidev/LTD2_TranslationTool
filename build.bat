powershell -Command "del build"

powershell -Command "mkdir .\build\firefox"
powershell -Command "mkdir .\build\chrome"

powershell -Command "Copy-Item -Recurse -Path .\common\* -Destination .\build\firefox"
powershell -Command "Copy-Item -Recurse -Path .\common\* -Destination .\build\chrome"

powershell -Command "Copy-Item -Recurse -Path .\firefox\* -Destination .\build\firefox"
powershell -Command "Copy-Item -Recurse -Path .\chrome\* -Destination .\build\chrome"

powershell -Command "Compress-Archive -Path .\build\firefox -DestinationPath .\build\CoachTranslateTool_firefox.zip"
powershell -Command "Compress-Archive -Path .\build\chrome -DestinationPath .\build\CoachTranslateTool_chrome.zip"