import Foundation

struct WalletRequest: JSONMessage {

  static let typeIdentifier = "com.example.message"

  enum Kind: String {
    case PresentationDefinition
  }

  let kind: Kind
  let value: Any
  
}
