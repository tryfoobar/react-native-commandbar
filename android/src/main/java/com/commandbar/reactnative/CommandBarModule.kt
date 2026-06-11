package com.commandbar.reactnative

import com.facebook.react.bridge.*
import com.commandbar.android.CommandBar
import com.commandbar.android.CommandBarOptions
import org.json.JSONArray
import org.json.JSONObject

class CommandBarModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "RNCommandBar"

  @ReactMethod
  fun boot(options: ReadableMap) {
    CommandBar.boot(CommandBarOptions(dictionary = options.toHashMap()))
  }

  @ReactMethod
  fun openResourceCenter(articleId: Int, onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return
    val _articleId = if (articleId == -1) null else articleId

    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        CommandBar.openResourceCenter(activity, _articleId) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openResourceCenter(activity, _articleId)
      }
    }
  }

  @ReactMethod
  fun openAssistant(onFallbackActionCallback: Callback? = null) {
    val activity = currentActivity ?: return

    activity.runOnUiThread {
      if (onFallbackActionCallback != null) {
        CommandBar.openAssistant(activity) {
          onFallbackActionCallback.invoke(it)
        }
      } else {
        CommandBar.openAssistant(activity)
      }
    }
  }

  @ReactMethod
  fun closeResourceCenter() {
    val activity = currentActivity ?: return
    activity.runOnUiThread {
      CommandBar.closeResourceCenter()
    }
  }

  @ReactMethod
  fun closeAssistant() {
    val activity = currentActivity ?: return
    activity.runOnUiThread {
      CommandBar.closeAssistant()
    }
  }

  @ReactMethod
  fun setAssistantFilter(filter: ReadableMap?) {
    // `CommandBar.setAssistantFilter` may call `evaluateJavascript` on the active
    // WebView, which Android requires to run on the UI thread. We dispatch via
    // `UiThreadUtil.runOnUiThread` (posts to the main Looper) instead of
    // `currentActivity?.runOnUiThread` so that filters set while the app has no
    // foreground activity still reach `EngagementFilterStore` and are applied on the
    // next boot.
    val payload = readableMapToJSONObject(filter)
    UiThreadUtil.runOnUiThread { CommandBar.setAssistantFilter(payload) }
  }

  @ReactMethod
  fun setResourceCenterFilter(filter: ReadableMap?) {
    val payload = readableMapToJSONObject(filter)
    UiThreadUtil.runOnUiThread { CommandBar.setResourceCenterFilter(payload) }
  }

  private fun readableMapToJSONObject(map: ReadableMap?): JSONObject? {
    if (map == null) return null
    return toJSONObject(readableMapToMap(map))
  }

  private fun toJSONObject(map: Map<String, Any?>): JSONObject {
    val json = JSONObject()
    map.forEach { (key, value) ->
      when (value) {
        null -> json.put(key, JSONObject.NULL)
        is Map<*, *> ->
          @Suppress("UNCHECKED_CAST")
          json.put(key, toJSONObject(value as Map<String, Any?>))
        is List<*> -> json.put(key, toJSONArray(value))
        is Boolean -> json.put(key, value)
        is Double -> json.put(key, value)
        is Int -> json.put(key, value)
        is String -> json.put(key, value)
        else -> json.put(key, value.toString())
      }
    }
    return json
  }

  private fun toJSONArray(list: List<*>): JSONArray {
    val json = JSONArray()
    list.forEach { item ->
      when (item) {
        null -> json.put(JSONObject.NULL)
        is Map<*, *> ->
          @Suppress("UNCHECKED_CAST")
          json.put(toJSONObject(item as Map<String, Any?>))
        is List<*> -> json.put(toJSONArray(item))
        is Boolean -> json.put(item)
        is Double -> json.put(item)
        is Int -> json.put(item)
        is String -> json.put(item)
        else -> json.put(item.toString())
      }
    }
    return json
  }

  private fun readableMapToMap(map: ReadableMap): Map<String, Any?> {
    val result = mutableMapOf<String, Any?>()
    val iterator = map.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      result[key] = when (map.getType(key)) {
        ReadableType.Null -> null
        ReadableType.Boolean -> map.getBoolean(key)
        ReadableType.Number -> map.getDouble(key)
        ReadableType.String -> map.getString(key)
        ReadableType.Map -> readableMapToMap(map.getMap(key)!!)
        ReadableType.Array -> readableArrayToList(map.getArray(key)!!)
        else -> null
      }
    }
    return result
  }

  private fun readableArrayToList(array: ReadableArray): List<Any?> {
    val result = mutableListOf<Any?>()
    for (i in 0 until array.size()) {
      result.add(
        when (array.getType(i)) {
          ReadableType.Null -> null
          ReadableType.Boolean -> array.getBoolean(i)
          ReadableType.Number -> array.getDouble(i)
          ReadableType.String -> array.getString(i)
          ReadableType.Map -> readableMapToMap(array.getMap(i)!!)
          ReadableType.Array -> readableArrayToList(array.getArray(i)!!)
          else -> null
        }
      )
    }
    return result
  }
}
