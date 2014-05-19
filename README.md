cordova-sqliteplugin-todo
=========================

Todo list example for Cordova-SQLitePlugin using ydn-db

Setup for OS X
--------------

Ensure you have node.js (http://nodejs.org/) and XCode available.

Install phonegap and cordova

    npm install -g phonegap
    npm install -g cordova
    
Install plugins,
 1. iOS deploy
 2. iOS sim
 3. console log
    
    npm install -g ios-deploy
    npm install -g ios-sim

    
Create phonegap app
    
    phonegap create ydn-todo ydn.todo ydn-todo
    
Clone the repo and copy the files 
    
    git clone git clone https://github.com/yathit/cordova-sqliteplugin-todo.git
    cp -r cordova-sqliteplugin-todo/ydn-todo/www/* ydn-todo/www/
    
Build and run
    
    cd ydn-todo
    cordova platform add ios
    cordova plugin add https://github.com/millerjames01/Cordova-SQLitePlugin.git 
    cordova plugin add org.apache.cordova.console
    phonegap build ios
    cordova run ios
    
    