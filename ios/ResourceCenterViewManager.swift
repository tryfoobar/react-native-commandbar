import CommandBarIOS


@objc(RNCommandBarEventEmitter)
class RNCommandBarEventEmitter : RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNCommandBarEventEmitter.emitter = self
  }

  override func supportedEvents() -> [String] {
      ["onFallbackAction"]
    }
      
  public override static func requiresMainQueueSetup() -> Bool {
      return true
  }
}

class RNResourceCenterView : UIView {
    @objc var options: NSDictionary? {
        didSet {
            self.resourceCenterWebView.options = CommandBarOptions(dictionary: options as! [String: Any])
        }
    }
    
    override init(frame: CGRect) {
      super.init(frame: frame)
      self.addSubview(resourceCenterWebView)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    lazy var resourceCenterWebView: ResourceCenterWebView = {
        let webview = ResourceCenterWebView(frame: CGRect.zero)
        webview.delegate = self
        webview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
      return webview
    }()
}

extension RNResourceCenterView: ResourceCenterWebViewDelegate {
    func didTriggerAssistantFallback(_ action: [String : Any]) {
        RNCommandBarEventEmitter.emitter.sendEvent(withName: "onFallbackAction", body: action)
    }
}


@objc(ResourceCenterViewManager)
class ResourceCenterViewManager: RCTViewManager {
    override func view() -> UIView! {
        return RNResourceCenterView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
