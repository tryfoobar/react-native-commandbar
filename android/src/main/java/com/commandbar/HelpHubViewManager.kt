package com.commandbar

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class HelpHubViewManager(reactContext: ReactApplicationContext) : SimpleViewManager<HelpHubWebView>() {

  override fun getName(): String {
    return "HelpHubView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): HelpHubWebView {
    return HelpHubWebView(reactContext)
  }
}
