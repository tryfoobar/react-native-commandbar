package com.commandbar.reactnative

import com.commandbar.android.CommandBarOptions
import com.commandbar.android.ResourceCenterWebView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class ResourceCenterViewManager(var reactContext: ReactApplicationContext) : SimpleViewManager<ResourceCenterWebView>() {
  private lateinit var commandBarOptions: CommandBarOptions

  override fun getName(): String {
    return "ResourceCenterView"
  }

  @ReactProp(name = "options")
  fun setOptions(view: ResourceCenterWebView, options: ReadableMap) {
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

  override fun createViewInstance(reactContext: ThemedReactContext): ResourceCenterWebView {
    return ResourceCenterWebView(reactContext)
  }
}
