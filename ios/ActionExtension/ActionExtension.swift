//
// Copyright © Square, Inc. All rights reserved.
//

import Foundation
import MobileCoreServices

@objc(ActionExtension)
class ActionExtension: NSObject {

  static var viewController: ActionViewController?

  @objc
  func dismiss() {
    if let viewController = ActionExtension.viewController,
       let extensionContext = viewController.extensionContext {
      extensionContext.completeRequest(returningItems: nil)
    }
  }

  @objc
  func getWalletRequest(
    _ resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    func resolve(_ value: Any?) {
      Task { @MainActor in
        resolver(value)
      }
    }

    func reject(_ code: String?, _ message: String?, _ error: Error?) {
      Task { @MainActor in
        rejecter(code, message, error)
      }
    }

    guard let extensionContext = ActionExtension.viewController?.extensionContext else {
      reject("error", "ExtensionContext unavailable", nil)
      return
    }

    guard let items = extensionContext.inputItems as? [NSExtensionItem] else {
      reject("error", "No extensionContext.inputItems provided", nil)
      return
    }

    guard let extensionItem = items.first,
          let itemProvider = extensionItem.attachments?.first else {
      reject("error", "No NSItemProvider provided", nil)
      return
    }

    if itemProvider.hasItemConformingToTypeIdentifier(WalletRequest.typeIdentifier) {
      itemProvider.loadDataRepresentation(forTypeIdentifier: WalletRequest.typeIdentifier) { data, error in
        guard let data else {
          reject("error", "Loading Message Failed", error)
          return
        }

        do {
          let json = try JSONSerialization.jsonObject(with: data)
          resolve(json)
        } catch {
          reject("error", "Deserializing message failed", error)
        }
      }
    } else {
      reject("error", "Unsupported Type", nil)
    }
  }

  @objc
  func sendPresentationSubmission(
    _ jwt: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    sendWalletResponse(
      response: WalletResponse(
        kind: .PresentationSubmission,
        value: jwt
      ),
      resolver:resolver,
      rejecter: rejecter
    )
  }

  func sendWalletResponse(
    response: WalletResponse,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    if let viewController = ActionExtension.viewController,
       let extensionContext = viewController.extensionContext {

      let data: Data
      do {
        data = try JSONSerialization.data(withJSONObject: response.jsonObject)
      } catch {
        return rejecter("error", "Error serializing JSON", error)
      }

      let item = NSExtensionItem()
      item.attachments = [
        NSItemProvider(
          item: NSData(data: data),
          typeIdentifier: WalletResponse.typeIdentifier
        )
      ]

      extensionContext.completeRequest(returningItems: [item])
    }

    resolver(())
  }

  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
