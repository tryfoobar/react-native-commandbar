import CommandBarIOS

@objc(HelpHubViewManager)
class HelpHubViewManager: RCTViewManager {
    @objc var orgId: NSString = ""
    @objc var onOpenSupportChat: RCTDirectEventBlock?

    func sendUpdate() {
        // TODO: Hook up callback
        // onOpenSupportChat!(["count": count])
    }

    override func view() -> UIView! {
        return HelpHubWebView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
