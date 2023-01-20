powershell -Command "del .\CoachTranslateTool_firefox.zip -Force"
powershell -Command "del .\CoachTranslateTool_chrome.zip -Force"

powershell -Command "Compress-Archive -Path .\firefox\* -DestinationPath .\CoachTranslateTool_firefox.zip"
powershell -Command "Compress-Archive -Path .\chrome\* -DestinationPath .\CoachTranslateTool_chrome.zip"