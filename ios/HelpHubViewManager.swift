import CommandBarIOS

@objc(HelpHubViewManager)
class HelpHubViewManager: RCTViewManager {
    @objc var options: NSDictionary?
    @objc var onFallbackAction: RCTDirectEventBlock?

    override func view() -> UIView! {
        let options = CommandBarOptions(dictionary: self.options as! [String : Any])
        let helpHubWebView = HelpHubWebView(frame: CGRect.zero, options: options)
        helpHubWebView.delegate = self
        return helpHubWebView
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

extension HelpHubViewManager: HelpHubWebViewDelegate {
    func didReceiveFallbackAction(_ action: [String : Any]) {
        self.onFallbackAction?(action)
    }
}
