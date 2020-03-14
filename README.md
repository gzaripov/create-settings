# Create Settings

Typesafe and lightweight tool for working with settings

[![npm version](https://badge.fury.io/js/create-settings.svg)](https://badge.fury.io/js/create-settings)
[![CircleCI](https://circleci.com/gh/gzaripov/create-settings.svg?style=svg)](https://circleci.com/gh/gzaripov/create-settings.svg?style=svg)
[![codecov](https://codecov.io/gh/gzaripov/create-settings/branch/master/graph/badge.svg)](https://codecov.io/gh/gzaripov/create-settings)

## Installation

```bash
npm i create-settings
# or
yarn add create-settings
```

## Problem

You need configurable module that will be configured in runtime with different values those depend on environment,
you want it to be typesafe, lightweight and easy to use,

## Usage

```javascript
import createSettings from 'create-settings';

const settings = createSettings({
  userMoney: 100,
  userName: 'Jack',
});

// variant 1
settings
  .configure()
  .userMoney(100)
  .userName('Tom');

// variant 2
function configureTomUser(configurator) {
  configurator.userMoney(100).userName('Tom');
}

settings.configure(configureTomUser);
```

## API

### createSettings(defaultSettings)

Create new settings object

Options:

| Name            | Type                     | Description                                           | Default |
| --------------- | ------------------------ | ----------------------------------------------------- | ------- |
| defaultSettings | `[setting: string]: any` | Array of AxiosLayer, this is the only required option | none    |

### Settings.configure

Configure settings object, you can provide function for configuration, or configure it inline i.e.

```javascript
settings
  .configure()
  .setting1('value')
  .setting2('value2');
```


### Settings.configureAsync

The same as configure but works with Promise API

## Testing

1. You can create factory and call that in tests

    ```javascript

    const createUserSettings = () => createSettings({
      setting: 'settings'
    })

    ```

    and in each test create it with needed values,

2. You can just export settings object and in test reset it in beforeEach hook

Library export `ExtractSettingsObject` helper type in case when you need to get type of settings object itself

## Licence

MIT
