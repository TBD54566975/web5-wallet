import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export const BrowserScreen = () => {
  function onMessage(data) {
    alert(data.nativeEvent.data);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{
          html: ` 
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
            "
          >
            <button
            onclick="sendDataToReactNativeApp()"
              style="
                padding: 20;
                width: 200;
                font-size: 20;
                color: white;
                background-color: #6751ff;
              "
            >
              Send Data To React Native App
            </button>
            <script>
              const sendDataToReactNativeApp = async () => {
                window.ReactNativeWebView.postMessage('Data from WebView / Website');
              };
            </script>
          </body>
        </html>        
`,
        }}
      />
    </SafeAreaView>
  );
};
