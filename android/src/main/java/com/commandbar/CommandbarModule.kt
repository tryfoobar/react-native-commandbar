package com.commandbar

import android.util.DisplayMetrics
import android.view.ViewGroup
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.bottomsheet.BottomSheetDialog

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "RNCommandBar"
  }


  @ReactMethod
  fun openHelpHub(promise: Promise) {
    val activity = currentActivity
    if (activity == null) {
      // TODO: Throw meaningful error
      promise.reject("ACTIVITY_NULL", "Current activity not available")
      return
    }

    activity.runOnUiThread {
      val webView = HelpHubWebView(activity)
      // Create a bottom sheet modal to hold the WebView
      val bottomSheetDialog = BottomSheetDialog(activity)
      bottomSheetDialog.setContentView(webView)

      // Retrieve the BottomSheetBehavior from the BottomSheetDialog's internal content view
      val bottomSheet =
        bottomSheetDialog.findViewById<ViewGroup>(com.google.android.material.R.id.design_bottom_sheet)
      val behavior = BottomSheetBehavior.from(bottomSheet!!)
      val displayMetrics = DisplayMetrics()
      activity.windowManager.defaultDisplay.getMetrics(displayMetrics)
      val screenHeight = displayMetrics.heightPixels
      behavior.peekHeight = screenHeight

      bottomSheetDialog.show()
    }
  }
}
