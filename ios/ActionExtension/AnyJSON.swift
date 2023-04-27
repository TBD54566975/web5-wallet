import Foundation

struct AnyJSON: Codable {
    private let value: Codable

    init<T: Codable>(_ value: T) {
        self.value = value
    }

    func encode(to encoder: Encoder) throws {
        try value.encode(to: encoder)
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()

        if let intValue = try? container.decode(Int.self) {
            value = intValue
        } else if let doubleValue = try? container.decode(Double.self) {
            value = doubleValue
        } else if let boolValue = try? container.decode(Bool.self) {
            value = boolValue
        } else if let stringValue = try? container.decode(String.self) {
            value = stringValue
        } else if let arrayValue = try? container.decode([AnyJSON].self) {
            value = arrayValue
        } else if let dictionaryValue = try? container.decode([String: AnyJSON].self) {
            value = dictionaryValue
        } else {
            throw DecodingError.dataCorruptedError(in: container, debugDescription: "AnyJSON value cannot be decoded")
        }
    }
}
