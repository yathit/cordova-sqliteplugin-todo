cordova-sqliteplugin-todo
=========================

Todo list example for Cordova-SQLitePlugin using ydn-db

Setup for iOS
-------------

Ensure you have node.js (http://nodejs.org/) and XCode available on your Mac.

Install phonegap and cordova

    npm install -g phonegap
    npm install -g cordova
    
Install plugins,
 1. iOS deploy
 2. iOS sim
    
    npm install -g ios-deploy
    npm install -g ios-sim

    
Create phonegap app
    
    phonegap create ydn-todo ydn.todo ydn-todo
    
Clone the repo and copy the files 
    
    git clone git clone https://github.com/yathit/cordova-sqliteplugin-todo.git
    
Build and run
    
    cd ydn-todo
    cordova platform add ios
    cordova plugin add https://github.com/millerjames01/Cordova-SQLitePlugin.git 
    phonegap build ios
    cordova run ios
    
Setup for Android
-----------------

Note: For Android 4.4 and above, prefer native IndexedDB over SqlitePlugin since Sqlite plugin does not cover corner cases.
 

Download and install [Android SDK](http://developer.android.com/sdk/index.html) or Android studio bundle.

Download and install [Cordova](http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_android_index.md.html).

Build

    phonegap local build android
    
Check plugin
    
    phonegap local plugin list
    
You should see

    [phonegap] com.millerjames01.sqlite-plugin
    
Run android simulator
    
    phonegap local run android
    

    
#### Credits ####
        
Special thanks to Stefano Straus <stefano@straus.it> for his help in setup, testing and bug reports.