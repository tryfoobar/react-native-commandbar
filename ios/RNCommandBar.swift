import Foundation
import WebKit
import CommandBarIOS

@objc(RNCommandBar)
class RNCommandBar : NSObject {
    @objc
    func openResourceCenter(_ options: NSDictionary, articleId: NSNumber, onFallbackAction fallbackAction: @escaping RCTResponseSenderBlock) -> Void {
        let options = CommandBarOptions_Deprecated(options as! [String : Any])
        let handler = CommandBarHandler(options, onFallbackAction: fallbackAction)
        handler.openResourceCenter(articleId: articleId == -1 ? nil : articleId)
    }

    @objc
    func openAssistant(_ options: NSDictionary, onFallbackAction fallbackAction: @escaping RCTResponseSenderBlock) -> Void {
        let options = CommandBarOptions_Deprecated(options as! [String : Any])
        let handler = CommandBarHandler(options, onFallbackAction: fallbackAction)
        handler.openAssistant()
    }
    
    private class CommandBarHandler : HelpHubWebViewDelegate {
        var commandbar: CommandBar_Deprecated
        var onFallbackAction: RCTResponseSenderBlock? = nil
        
        init(_ options: CommandBarOptions_Deprecated, onFallbackAction fallbackAction: RCTResponseSenderBlock? = nil) {
            self.commandbar = CommandBar_Deprecated(options: options)
            commandbar.delegate = self
            self.onFallbackAction = fallbackAction
        }
        
        func openResourceCenter(articleId: NSNumber? = nil) {
            self.commandbar.openResourceCenter(articleId: articleId as? Int)
        }

        func openAssistant() {
            self.commandbar.openAssistant()
        }
        
        func didReceiveFallbackAction(_ action: [String : Any]) {
            self.onFallbackAction?([action])
        }
    }
}
