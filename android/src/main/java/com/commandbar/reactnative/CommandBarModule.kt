package com.commandbar.reactnative


import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar
import com.commandbar.android.CommandBarOptions

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "RNCommandBar"

  @ReactMethod
  fun openHelpHub(options: ReadableMap, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return

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
