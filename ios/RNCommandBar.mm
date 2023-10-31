#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RNCommandBar, NSObject)
  RCT_EXTERN_METHOD(
    openHelpHub: (NSString *)orgId
    resolver: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject
  )

  + (BOOL)requiresMainQueueSetup
  {
    return YES;
  }
@end


@interface RCT_EXTERN_MODULE(HelpHubViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(options, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onFallbackAction, RCTDirectEventBlock)

@end
