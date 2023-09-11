import type { SyncManager, Web5ManagedAgent } from "@web5/agent";

// SyncManagerLevel is incompatible with mobile, as is uses `Level`.
// NoOpSyncManager is a drop-in replacement on mobile for the time being
// to get the app building properly. Sync will be implemented later.

export class NoOpSyncManager implements SyncManager {
  private _agent?: Web5ManagedAgent;

  get agent(): Web5ManagedAgent {
    if (this._agent === undefined) {
      throw new Error(
        "DidManager: Unable to determine agent execution context."
      );
    }

    return this._agent;
  }

  set agent(agent: Web5ManagedAgent) {
    this._agent = agent;
  }

  registerIdentity(): Promise<void> {
    return Promise.resolve();
  }

  startSync(): Promise<void> {
    return Promise.resolve();
  }

  stopSync(): void {}

  push(): Promise<void> {
    return Promise.resolve();
  }

  pull(): Promise<void> {
    return Promise.resolve();
  }
}
