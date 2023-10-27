package com.commandbarmodule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.commandbar.android.HelpHubWebView
import com.facebook.react.uimanager.annotations.ReactProp

class HelpHubViewManager(reactContext: ReactApplicationContext) : SimpleViewManager<HelpHubWebView>() {

  override fun getName(): String {
    return "HelpHubView"
  }

  @ReactProp(name = "orgId")
  fun setOrgId(view: HelpHubWebView, orgId: String) {
    view.setOrgId(orgId)
  }

  override fun createViewInstance(reactContext: ThemedReactContext): HelpHubWebView {
    return HelpHubWebView(reactContext, null)
  }
}
