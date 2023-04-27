import Foundation

protocol JSONMessage {
  associatedtype Kind: RawRepresentable

  var kind: Kind { get }
  var value: Any { get }

  init(kind: Kind, value: Any)
}

private enum CodingKeys: String {
  case kind
  case value
}

extension JSONMessage {

  init?(jsonObject: [String: Any]) {
    guard let rawKind = jsonObject[CodingKeys.kind.rawValue] as? Self.Kind.RawValue,
          let kind = Kind(rawValue: rawKind),
          let value = jsonObject[CodingKeys.value.rawValue]
    else {
      return nil
    }

    self.init(kind: kind, value: value)
  }

  var jsonObject: [String: Any] {
    return [
      CodingKeys.kind.rawValue: kind.rawValue,
      CodingKeys.value.rawValue: value
    ]
  }

}
