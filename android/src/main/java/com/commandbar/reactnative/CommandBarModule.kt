package com.commandbar.reactnative


import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar
import com.commandbar.android.CommandBarOptions

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "RNCommandBar"

  @ReactMethod
  fun openHelpHub(options: ReadableMap, articleId: Int, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return
    val commandBarOptions = CommandBarOptions(dictionary = options.toHashMap())
    val _articleId = if (articleId == -1) null else articleId
    
    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        // Kinda hacky, but in react native we can't use nullable Int for compatability with android so we use -1 in this case
        CommandBar.openHelpHub(activity, commandBarOptions, _articleId) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openHelpHub(activity, commandBarOptions, _articleId)
      }
    }
  }
}
