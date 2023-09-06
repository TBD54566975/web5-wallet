import React, { useEffect } from "react";
import { AppNavigator } from "./navigation/AppNavigator";
import { DwnManger } from "./features/dwn/DwnManager";
import { bootstrapIdentityAgent } from "./features/identity/identity-agent";

const App = () => {
  useEffect(() => {
    const startupTasks = async () => {
      await DwnManger.initExpoLevelDwn();
      await bootstrapIdentityAgent(
        "passphrase",
        "Personal",
        DwnManger.getDwn()
      );
    };
    void startupTasks();
  }, []);

  return <AppNavigator />;
};

export default App;
