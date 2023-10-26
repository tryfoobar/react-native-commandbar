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
        return HelpHubWebView(orgId: self.orgId as String, frame: CGRect.zero)
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
