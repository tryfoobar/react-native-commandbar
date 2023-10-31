package com.commandbarmodule


import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar
import com.commandbar.android.CommandBarOptions

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNCommandBar"
  }

  @ReactMethod
  fun openHelpHub(options: ReadableMap, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity
    if (activity == null) {
      return
    }

    val commandBarOptions = CommandBarOptions(dictionary = options.toHashMap())

    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        CommandBar.openHelpHub(activity, commandBarOptions) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openHelpHub(activity, commandBarOptions)
      }
    }
  }
}
