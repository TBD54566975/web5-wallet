import { AbstractDatabaseOptions, AbstractLevel } from 'abstract-level'

export type LevelType = AbstractLevel<string>

export class LevelFactory {
  public static createAbstractLevel<T extends AbstractLevel<string>>(
    levelClass: new (location: string, options?: AbstractDatabaseOptions<string, string>) => T,
    location: string,
    options?: AbstractDatabaseOptions<string, string>
  ): T {
    return new levelClass(location, options)
  }
}
