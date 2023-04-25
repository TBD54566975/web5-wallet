//
// Copyright © Square, Inc. All rights reserved.
//

import Foundation
import MobileCoreServices

@objc(ActionExtension)
class ActionExtension: NSObject {

  static let exampleMessageTypeIdentifier = "com.example.message"
  static var viewController: ActionViewController?

  @objc
  func dismiss() {
    if let viewController = ActionExtension.viewController,
       let extensionContext = viewController.extensionContext {
      extensionContext.completeRequest(returningItems: nil)
    }
  }

  @objc
  func getData(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let extensionContext = ActionExtension.viewController?.extensionContext else {
      return reject("error", "ExtensionContext unavailable", nil);
    }

    guard let items = extensionContext.inputItems as? [NSExtensionItem] else {
      return reject("error", "No extensionContext.inputItems provided", nil);
    }

    guard let extensionItem = items.first,
          let itemProvider = extensionItem.attachments?.first else {
      return reject("error", "No NSItemProvider provided", nil);
    }

    if itemProvider.hasItemConformingToTypeIdentifier(Self.exampleMessageTypeIdentifier) {
      itemProvider.loadDataRepresentation(forTypeIdentifier: Self.exampleMessageTypeIdentifier) { data, error in
        Task { @MainActor in
          if let data,
             let message = try? JSONDecoder().decode(String.self, from: data) {
            resolve(message)
          } else {
            reject("error", "Load message failed", error)
          }
        }
      }
    } else {
      return reject("error", "Unsupported Type", nil)
    }
  }


  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
