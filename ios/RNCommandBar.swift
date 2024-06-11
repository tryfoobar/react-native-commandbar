import Foundation
import WebKit
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func openHelpHub(_ options: NSDictionary, onFallbackAction fallbackAction: RCTResponseSenderBlock? = nil) -> Void {
        let options = CommandBarOptions_Deprecated(options as! [String : Any])
        let handler = CommandBarHandler(options, onFallbackAction: fallbackAction)
        handler.openHelpHub()
    }
    
    private class CommandBarHandler : HelpHubWebViewDelegate {
        var commandbar: CommandBar_Deprecated
        var onFallbackAction: RCTResponseSenderBlock? = nil
        
        init(_ options: CommandBarOptions_Deprecated, onFallbackAction fallbackAction: RCTResponseSenderBlock? = nil) {
            self.commandbar = CommandBar_Deprecated(options: options)
            commandbar.delegate = self
            self.onFallbackAction = fallbackAction
        }
        
        func openHelpHub() {
            self.commandbar.openHelpHub()
        }
        
        func didReceiveFallbackAction(_ action: [String : Any]) {
            self.onFallbackAction?([action])
        }
    }
}
