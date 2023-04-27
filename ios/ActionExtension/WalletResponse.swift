import Foundation

struct WalletResponse: JSONMessage {
  
  static let typeIdentifier = "com.message.response"

  enum Kind: String, Codable {
    case PresentationSubmission
  }

  let kind: Kind
  let value: Any

}
