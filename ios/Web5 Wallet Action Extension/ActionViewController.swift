//
// Copyright © Square, Inc. All rights reserved.
//

import UIKit
import MobileCoreServices
import UniformTypeIdentifiers

class ActionViewController: UIViewController {

  static let exampleMessageTypeIdentifier = "com.example.message"

  override func viewDidLoad() {
    super.viewDidLoad()
    guard let items = extensionContext?.inputItems as? [NSExtensionItem] else { return }

    for item in items {
      guard let attachments = item.attachments else { continue }
      for provider in attachments {
        if provider.hasItemConformingToTypeIdentifier(Self.exampleMessageTypeIdentifier) {

          provider.loadDataRepresentation(
            forTypeIdentifier: Self.exampleMessageTypeIdentifier
          ) { _, _ in
            print("Loaded data from other app")
          }
        }
      }
    }
  }

  @IBAction func done() {
    // Return any edited content to the host app.
    // This template doesn't do anything, so we just echo the passed in items.
    self.extensionContext!.completeRequest(returningItems: self.extensionContext!.inputItems, completionHandler: nil)
  }

}
