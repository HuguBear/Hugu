package com.huguapp.utility;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.*;
import android.net.Uri;
import android.os.Environment;
import java.io.*;
import android.content.Context;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class UtilityModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    private Callback recordingRenamerCallback = null;

    private static final String RecordingsDirPath = "RecordingsDirPath";

    public UtilityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Utility";
    }

    @ReactMethod
    public void rename(String currentFileName, String renameTo, final Callback successCallback, final Callback errorCallback) {
      String extStore = System.getenv("EXTERNAL_STORAGE") + "/Android/data/com.huguapp/files/data";
      String filenameArray[] = currentFileName.split("\\.");
      String extension = "." + filenameArray[filenameArray.length-1];

      //Checks if filename already exists
      File renamingTO = new File(extStore + renameTo);
      if(renamingTO.exists()) {
        errorCallback.invoke("exists");
        return;
      }

      renameTo = renameTo + extension;
      File from = new File(extStore, currentFileName);
      File to = new File(extStore, renameTo);
      if(from.exists()) {
        if( from.renameTo(to) ) {
          currentFileName = extStore + "/" + renameTo;
          successCallback.invoke(currentFileName); // Invokes callback that returns filepath
        }
      }
    }

    @Override
    public Map<String, Object> getConstants() {
      final Map<String, Object> constants = new HashMap<>();

      String recordings = System.getenv("EXTERNAL_STORAGE") + "/Android/data/com.huguapp/files/data";
      constants.put(RecordingsDirPath, recordings);

      return constants;
    }

  }
