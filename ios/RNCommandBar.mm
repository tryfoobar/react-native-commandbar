#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RNCommandBar, NSObject)
  RCT_EXTERN_METHOD(
    openResourceCenter: (NSDictionary *)options
    articleId: (nonnull NSNumber *)articleId
    onFallbackAction: (RCTResponseSenderBlock)fallbackAction
  )

  RCT_EXTERN_METHOD(
    openAssistant: (NSDictionary *)options
    onFallbackAction: (RCTResponseSenderBlock)fallbackAction
  )

  RCT_EXTERN_METHOD(setAssistantFilter: (NSDictionary *)filter)

  RCT_EXTERN_METHOD(setResourceCenterFilter: (NSDictionary *)filter)

  + (BOOL)requiresMainQueueSetup
  {
    return YES;
  }
@end


@interface RCT_EXTERN_MODULE(ResourceCenterViewManager, RCTViewManager)
    RCT_EXPORT_VIEW_PROPERTY(options, NSDictionary)

    + (BOOL)requiresMainQueueSetup
    {
      return YES;
    }
@end

@interface RCT_EXTERN_MODULE(RNCommandBarEventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

    + (BOOL)requiresMainQueueSetup
    {
      return YES;
    }
@end
