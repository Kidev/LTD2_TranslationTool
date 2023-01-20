powershell -Command "del .\build -Force -Recurse"
powershell -Command "del .\CoachTranslateTool_firefox.zip -Force"
powershell -Command "del .\CoachTranslateTool_chrome.zip -Force"

powershell -Command "mkdir .\build\firefox"
powershell -Command "mkdir .\build\chrome"

powershell -Command "Copy-Item -Recurse -Path .\firefox\* -Destination .\build\firefox"
powershell -Command "Copy-Item -Recurse -Path .\chrome\* -Destination .\build\chrome"

powershell -Command "Compress-Archive -Path .\build\firefox\* -DestinationPath .\CoachTranslateTool_firefox.zip"
powershell -Command "Compress-Archive -Path .\build\chrome\* -DestinationPath .\CoachTranslateTool_chrome.zip"