import Foundation
import WebKit
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func openHelpHub(_ options: NSDictionary, onFallBackAction fallbackAction: RCTResponseSenderBlock? = nil) -> Void {
        let options = CommandBarOptions(dictionary: options as! [String : Any])
        let commandbar = CommandBar(options: options)
        commandbar.openHelpHub(resolve: nil, reject: nil)
        resolve(true)
    }
}
