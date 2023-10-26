package com.commandbarmodule

import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNCommandBar"
  }


  @ReactMethod
  fun openHelpHub(promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
      // TODO: Throw meaningful error
      promise.reject("ACTIVITY_NULL", "Current activity not available")
      return
    }

    // TODO: Probably change this up to not need to instantiate
    val commandbar = CommandBar()
    commandbar.openHelpHub(activity)
  }
}
