import Foundation
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
  
    @objc
    func openHelpHub(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        CommandBar.openHelpHub()
    }
}
