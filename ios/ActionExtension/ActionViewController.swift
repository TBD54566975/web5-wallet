import MobileCoreServices
import UIKit

@objc(ActionViewController)
class ActionViewController: UIViewController {

  override func loadView() {
    ActionExtension.viewController = self

    let jsCodeLocation: URL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "actionextension", fallbackExtension: nil)
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "ActionExtension", initialProperties: nil, launchOptions: nil)

    self.view = rootView
  }

}

