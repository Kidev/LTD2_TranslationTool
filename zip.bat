powershell -Command "Get-ChildItem -Path .\build\firefox\* -Recurse | Compress-Archive -Recurse  -DestinationPath .\build\CoachTranslateTool_firefox.zip"
powershell -Command "Get-ChildItem -Path .\build\chrome\* -Recurse | Compress-Archive -Recurse  -DestinationPath .\build\CoachTranslateTool_chrome.zip"