package com.commandbarmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.commandbar.android.HelpHubWebView

class HelpHubViewManager(reactContext: ReactApplicationContext) : SimpleViewManager<HelpHubWebView>() {

  override fun getName(): String {
    return "HelpHubView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): HelpHubWebView {
    return HelpHubWebView(reactContext)
  }
}
