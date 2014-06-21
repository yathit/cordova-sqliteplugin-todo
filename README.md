cordova-sqliteplugin-todo
=========================

Todo list example for Cordova-SQLitePlugin using ydn-db

Setup for iOS
-------------

Check out [cordova](http://docs.phonegap.com/) project and install build tool chain.

Create phonegap app
    
    cordova create ydn-todo ydn.todo "YDN-DN todo"
    
Clone the repo and copy the files 
    
    git clone git clone https://github.com/yathit/cordova-sqliteplugin-todo.git
    cp cordova-sqliteplugin-todo/ydn-todo/www/js/* ydn-todo/www/js/
    
Finally update index.html manually (recommanded) or
    
    cp cordova-sqliteplugin-todo/ydn-todo/www/index.html ydn-todo/www/index.html
    
    
Build and run
    
    cd ydn-todo
    cordova platform add ios
    cordova plugin add https://github.com/millerjames01/Cordova-SQLitePlugin.git 
    cordova build ios
    cordova run ios
    
Setup for Android
-----------------

Note: For Android 4.4 and above, prefer native IndexedDB over SqlitePlugin since Sqlite plugin does not cover corner cases.
 

Download and install [Android SDK](http://developer.android.com/sdk/index.html) or Android studio bundle.

Download and install [Cordova](http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_android_index.md.html).

Build

    cordova local build android
    
Check plugin
    
    cordova local plugin list
    
You should see

    [phonegap] com.millerjames01.sqlite-plugin
    
Run android simulator
    
    cordova local run android
    

    
#### Credits ####
        
Special thanks to Stefano Straus <stefano@straus.it> for his help in setup, testing and bug reports.
