package com.commandbarmodule


import com.facebook.react.bridge.*
import  com.commandbar.android.CommandBar


class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNCommandBar"
  }

  @ReactMethod
  fun openHelpHub(orgId: String, promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
      promise.reject("ACTIVITY_NULL", "Current activity not available")
      return
    }

    activity.runOnUiThread {
      CommandBar.openHelpHub(activity, orgId)
    }
  }
}
