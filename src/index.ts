const noop = Function.prototype as (...args: any[]) => void;

export type Configurator<S> = { [K in keyof S]: (value: S[K]) => Configurator<Omit<S, K>> };

type SettingsObject = {
  [setting: string]: any;
};

export type Configure<S extends SettingsObject> = (
  configureFn?: (configurator: Configurator<S>) => void,
) => Configurator<S>;

export type ConfigureAsync<S extends SettingsObject> = (
  configureFn?: (configurator: Configurator<S>) => void | Promise<any>,
) => Promise<Configurator<S>>;

type ConfigureObject<S extends SettingsObject> = {
  configure: Configure<S>;
  configureAsync: ConfigureAsync<S>;
};

export type Settings<S extends SettingsObject> = ConfigureObject<S> & S;

export type ExtractSettingsObject<S> = S extends Settings<infer SettingsObject>
  ? SettingsObject
  : never;

export default function createSettings<S extends SettingsObject>(defaultSettings: S): Settings<S> {
  const settings = { ...defaultSettings };
  const configurator = {} as Configurator<S>;
  const readonlySettings = {} as S;

  Object.keys(settings).forEach((setting: keyof S) => {
    configurator[setting] = (value) => {
      settings[setting] = value;

      return configurator;
    };

    Object.defineProperty(readonlySettings, setting, {
      get() {
        return settings[setting];
      },
      enumerable: true,
    });
  });

  const configure: Configure<S> = (configureFn = noop) => {
    configureFn(configurator);

    return configurator;
  };

  const configureAsync: ConfigureAsync<S> = (configureFn = noop) => {
    return Promise.resolve(configureFn(configurator)).then(() => configurator);
  };

  const configureObj = { configure, configureAsync };

  return Object.assign(readonlySettings, configureObj);
}

type Settable<T> = {
  get(): T;
  set(value: T): void;
};

export const settable = <T>(defaultValue: T): Settable<T> => {
  let current = defaultValue;

  return {
    get() {
      return current;
    },

    set(value: T) {
      current = value;
    },
  };
};
