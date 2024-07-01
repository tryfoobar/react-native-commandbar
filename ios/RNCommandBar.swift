import Foundation
import WebKit
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func openHelpHub(_ options: NSDictionary, articleId: NSNumber, onFallbackAction fallbackAction: @escaping RCTResponseSenderBlock) -> Void {
        let options = CommandBarOptions_Deprecated(options as! [String : Any])
        let handler = CommandBarHandler(options, onFallbackAction: fallbackAction)
        // Kinda hacky, but in react native we can't use nullable NSNumber for compatability with android so we use -1 in this case
        handler.openHelpHub(articleId: articleId == -1 ? nil : articleId)
    }
    
    private class CommandBarHandler : HelpHubWebViewDelegate {
        var commandbar: CommandBar_Deprecated
        var onFallbackAction: RCTResponseSenderBlock? = nil
        
        init(_ options: CommandBarOptions_Deprecated, onFallbackAction fallbackAction: RCTResponseSenderBlock? = nil) {
            self.commandbar = CommandBar_Deprecated(options: options)
            commandbar.delegate = self
            self.onFallbackAction = fallbackAction
        }
        
        func openHelpHub(articleId: NSNumber? = nil) {
            self.commandbar.openHelpHub(articleId: articleId as? Int)
        }
        
        func didReceiveFallbackAction(_ action: [String : Any]) {
            self.onFallbackAction?([action])
        }
    }
}
