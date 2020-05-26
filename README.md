# README

A guide to setup the application.

## SETUP

Before setup you must install react native 

(https://reactnative.dev/docs/getting-started)

After react native has been installed, first launch the server - navigate to the directory where your chittr_server is located and run the following command:

	node server.js

After the server is running, navigate to the directory that this README is located in and run the following command:

	npm install

After installing the dependencies, run the following command to start up the application:

	react-native run-android

In the case that errors occur when trying to run the application from terminal such as Metro Bundler not locating an emulator, the application can be launched with android studio. 

Once again run the command above and once the error occurs, leave the Metro bundler open. Open android studio, navigate to the android directory of this folder to open the project, wait for android to build the project and then run it with the emulator. Android studio will open an emulator and Metro Bundler will now recognise the emulator.

