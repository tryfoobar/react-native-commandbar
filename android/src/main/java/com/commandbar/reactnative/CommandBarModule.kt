package com.commandbar.reactnative


import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar
import com.commandbar.android.CommandBarOptions

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "RNCommandBar"

  @ReactMethod
  fun openResourceCenter(options: ReadableMap, articleId: Int, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return
    val commandBarOptions = CommandBarOptions(dictionary = options.toHashMap())
    val _articleId = if (articleId == -1) null else articleId

    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        CommandBar.openResourceCenter(activity, commandBarOptions, _articleId) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openResourceCenter(activity, commandBarOptions, _articleId)
      }
    }
  }

  @ReactMethod
  fun openAssistant(options: ReadableMap, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return
    val commandBarOptions = CommandBarOptions(dictionary = options.toHashMap())

    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        CommandBar.openAssistant(activity, commandBarOptions) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openAssistant(activity, commandBarOptions)
      }
    }
  }
}
