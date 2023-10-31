#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNCommandBar, NSObject)
  RCT_EXTERN_METHOD(
    openHelpHub: (NSDictionary *)options
    onFallbackAction: (RCTResponseSenderBlock)fallbackAction
  )

  + (BOOL)requiresMainQueueSetup
  {
    return YES;
  }
@end


@interface RCT_EXTERN_MODULE(HelpHubViewManager, RCTViewManager)
    RCT_EXPORT_VIEW_PROPERTY(options, NSDictionary)

    + (BOOL)requiresMainQueueSetup
    {
      return YES;
    }
@end


@interface RCT_EXTERN_MODULE(RNEventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

    + (BOOL)requiresMainQueueSetup
    {
      return YES;
    }
@end
