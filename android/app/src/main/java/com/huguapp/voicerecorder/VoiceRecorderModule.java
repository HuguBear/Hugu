// Name??
package com.huguapp.voicerecorder;

import android.media.MediaActionSound;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import com.facebook.react.bridge.*;
import com.facebook.react.bridge.Callback;
import android.media.MediaScannerConnection;
import javax.annotation.Nullable;
import java.io.*;
import android.media.MediaRecorder;
import android.media.CamcorderProfile;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import android.content.Intent;
import android.content.Context;

public class VoiceRecorderModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext _reactContext;
     private MediaRecorder audioRecorder = null;
     private File audioFile;
     private String audioFilePath = null;
     private String audioFileName = null;
     private Callback audioRecorderCallback = null;
     private String storagePath = null;


    public VoiceRecorderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _reactContext = reactContext;
        this.storagePath = _reactContext.getExternalFilesDir(Environment.getDataDirectory().getAbsolutePath()).getAbsolutePath();
    }
    // ReactContextBaseJavaModule requires that a method called getName is implemented.
    // The purpose of this method is to return the string name of the NativeModule which
    // represents this class in JavaScript. So here we will call this ToastAndroid so
    // that we can access it through:
    // ------------------>  React.NativeModules.ToastAndroid in JavaScript.
    @Override
    public String getName() {
        return "VoiceRecorder";
    }

    //Sets file name for current date and time
    @ReactMethod
    private String setFileName() {
      if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
        // audioFileName = Environment.getExternalStorageDirectory().getAbsolutePath();
        audioFileName = _reactContext.getExternalFilesDir(Environment.getDataDirectory().getAbsolutePath()).getAbsolutePath();
      }
        //ss - seconds; SSS - miliseconds
        String timeStamp = new SimpleDateFormat("yyMMddHHmmss").format(new Date());
        audioFileName += "/" + timeStamp + ".m4a";
        return audioFileName;
    }


    private boolean prepareAudioRecorder() {
        audioRecorder = new MediaRecorder();
        audioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC); // Defines the audio source. An audio source defines both a default physical source of audio signal, and a recording configuration.
        audioRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4); //Edited THREE_GPP
        setFileName();
        audioRecorder.setOutputFile(audioFileName);
        audioRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
        audioRecorder.setAudioEncodingBitRate(74000);
        audioRecorder.setAudioSamplingRate(44100);
        try {
            audioRecorder.prepare(); //Prepares the recorder to begin capturing and encoding data.
            return true;
        } catch (IOException e) {
            return false;
        }
    }
    // To expose a method to JavaScript a Java method must be annotated using @ReactMethod.
    // The return type of bridge methods is always void. React Native bridge is asynchronous,
    // so the only way to pass a result to JavaScript is by using callbacks or emitting events.
    @ReactMethod
    public void startAudioRecording(final Callback successCallback, final Callback errorCallback) {
        if (audioRecorderCallback == null) {
            if (prepareAudioRecorder()) {
                try {
                    audioRecorder.start();
                    audioRecorderCallback = successCallback;
                } catch (final Exception e) {
                    errorCallback.invoke("error: unable to invoke audioRecorder.start(): " + e.getMessage());
                }
            } else {
                errorCallback.invoke("AudioRecorder returned false");
            }
        } else {
            errorCallback.invoke("AudioRecorderCallback was not null/Could be already recording");
        }
    }

    @ReactMethod
    public void stopAudioRecording(final Callback callback) {
        if (audioRecorderCallback != null) {
            audioFile = new File(audioFileName);
            audioFilePath = audioFile.getAbsolutePath();
            Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);//Broadcast Action: Request the media scanner to scan a file and add it to the media database.
            intent.setData(Uri.fromFile(audioFile)); // Uri = identifier, URL = locator AND identifier
            _reactContext.sendBroadcast(intent);
            releaseAudioRecorder();
        } else {
            callback.invoke("not recording");
        }
    }
    private void releaseAudioRecorder() {
        if (audioRecorder != null) {
            audioRecorder.stop(); // Recording stopped
            audioRecorder.release(); // Now the object cannot be reused
             audioRecorder = null;
            if (audioRecorderCallback != null) {
                audioRecorderCallback.invoke(audioFileName);
                audioRecorderCallback = null;
            }
        }
    }
}
