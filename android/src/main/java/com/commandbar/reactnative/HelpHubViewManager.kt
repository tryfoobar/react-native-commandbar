package com.commandbar.reactnative

import com.commandbar.android.CommandBarOptions
import com.commandbar.android.HelpHubWebView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class HelpHubViewManager(var reactContext: ReactApplicationContext) : SimpleViewManager<HelpHubWebView>() {
  private lateinit var commandBarOptions: CommandBarOptions

  override fun getName(): String {
    return "HelpHubView"
  }

  @ReactProp(name = "options")
  fun setOptions(view: HelpHubWebView, options: ReadableMap) {
    this.commandBarOptions = CommandBarOptions(dictionary = options.toHashMap())
    view.setOptions(this.commandBarOptions)
    view.setFallbackActionCallback { this.handleFallbackAction(it) }
  }

  fun handleFallbackAction(action:  Map<String, Any>) {
    val payload: WritableMap = Arguments.makeNativeMap(action)

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("onFallbackAction", payload)
  }

  override fun createViewInstance(reactContext: ThemedReactContext): HelpHubWebView {
    return HelpHubWebView(reactContext)
  }
}
