import Foundation
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func openHelpHub(_ orgId: NSString, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        CommandBar.openHelpHub(orgId: orgId as String, resolve: nil, reject: nil)
        resolve(true)
    }
}
