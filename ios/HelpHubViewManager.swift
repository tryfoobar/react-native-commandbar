/*
 * @Author: Eric Phung
 * @Email: eric.phung@thryv.com
 * @Date: 2024-03-29 06:07:21
 */

import CommandBarIOS

@objc(CommandBarRNEventEmitter)
class CommandBarRNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    CommandBarRNEventEmitter.emitter = self
  }

  override func supportedEvents() -> [String] {
    ["onFallbackAction"]
  }

  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class RNHelpHubView: UIView {
  @objc var options: NSDictionary? {
    didSet {
      self.helpHubWebView.options = CommandBarOptions(options as! [String: Any])
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(helpHubWebView)
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
  }

  lazy var helpHubWebView: HelpHubWebView = {
    let webview = HelpHubWebView(frame: CGRect.zero)
    webview.delegate = self
    webview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    return webview
  }()
}

extension RNHelpHubView: HelpHubWebViewDelegate {
  func didReceiveFallbackAction(_ action: [String: Any]) {
    CommandBarRNEventEmitter.emitter.sendEvent(withName: "onFallbackAction", body: action)
  }
}

@objc(HelpHubViewManager)
class HelpHubViewManager: RCTViewManager {
  override func view() -> UIView! {
    return RNHelpHubView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
