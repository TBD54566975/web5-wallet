#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ActionExtension, NSObject)

RCT_EXTERN_METHOD(dismiss)

RCT_EXTERN_METHOD(getData: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

@end
