package com.huguapp.voiceplayer;

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
import android.media.MediaPlayer;
import android.media.AudioManager;
import android.media.MediaPlayer.OnCompletionListener;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class VoicePlayerModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    MediaPlayer mp;

    public VoicePlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

  private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) { // @Nullable WritableMap params
    this.reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
}

    @Override
    public String getName() {
        return "VoicePlayer";
    }

    @ReactMethod
    public void play(String audioPath) {
      // String path = reactContext.getExternalFilesDir(null).getAbsolutePath() + "GG:0629_112937.m4a";
      // String path = "storage/emulated/legacy/Android/data/com.hugu/files/data/GG:0629_112937.m4a";
      Uri audioUri = Uri.parse(audioPath);
      mp = new MediaPlayer();
      mp.setAudioStreamType(AudioManager.STREAM_MUSIC);
      try {
        mp.setDataSource(reactContext.getApplicationContext(), audioUri);
      } catch(IOException e) {
        e.printStackTrace();
      }
      try {
        mp.prepare();
      } catch(IOException e) {
        e.printStackTrace();
      }
      mp.start();
      mp.setOnCompletionListener(new OnCompletionListener() {
          @Override
          public void onCompletion(MediaPlayer mp) {
            int duration = 9999;
            mp = null;
            WritableMap params = Arguments.createMap();
            params.putInt("duration", duration);
            sendEvent(reactContext, "playBackFinished", params);
          }
        });
  }

    @ReactMethod
    public void pause() {
        try {
            if (mp.isPlaying()) {
                mp.pause();
            }
        } catch (NullPointerException e) {
        }
    }

    @ReactMethod
    public void getStoragePath(Callback storagePath) {
      // String storagePath = "ulalalal";//this.reactContext.getExternalFilesDir(Environment.getDataDirectory().getAbsolutePath()).getAbsolutePath();
        // return storagePath;
        storagePath.invoke("HELLLLOOO");
        // String test = "HELOOOOOOO";
        // return test;
    }
  }
