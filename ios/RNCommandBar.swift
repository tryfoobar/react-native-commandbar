import Foundation
import WebKit
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func boot(_ options: NSDictionary) -> Void {
        let parsed = CommandBarOptions(dictionary: options as! [String: Any])
        CommandBarSDK.shared.boot(options: parsed)
    }

    @objc
    func openResourceCenter(_ articleId: NSNumber,
                            onFallbackAction fallbackAction: @escaping RCTResponseSenderBlock) -> Void {
        CommandBarSDK.shared.openResourceCenter(
            articleId: articleId == -1 ? nil : articleId.intValue,
            fallbackAction: { type in fallbackAction([type]) }
        )
    }

    @objc
    func openAssistant(_ fallbackAction: @escaping RCTResponseSenderBlock) -> Void {
        CommandBarSDK.shared.openAssistant(
            fallbackAction: { type in fallbackAction([type]) }
        )
    }

    @objc
    func closeResourceCenter() -> Void {
        DispatchQueue.main.async {
            CommandBarSDK.shared.closeResourceCenter()
        }
    }

    @objc
    func closeAssistant() -> Void {
        DispatchQueue.main.async {
            CommandBarSDK.shared.closeAssistant()
        }
    }

    @objc(setAssistantFilter:)
    func setAssistantFilter(_ filter: NSDictionary?) {
        DispatchQueue.main.async {
            CommandBarSDK.shared.setAssistantFilter(filter as? [String: Any])
        }
    }

    @objc(setResourceCenterFilter:)
    func setResourceCenterFilter(_ filter: NSDictionary?) {
        DispatchQueue.main.async {
            CommandBarSDK.shared.setResourceCenterFilter(filter as? [String: Any])
        }
    }
}
