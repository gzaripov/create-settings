import createSettings, { settable } from '.';

describe('Settings', () => {
  describe('createSettings', () => {
    it('should allow to syncronously configure itself through confugure function', () => {
      const settings = createSettings({
        setting: 100,
        number: 'sdf',
      });

      expect(settings.setting).toBe(100);

      settings.configure((configurator) => {
        configurator.setting(1000);
      });

      expect(settings.setting).toBe(1000);
    });

    it('should allow to syncronously configure itself through result of configure function', () => {
      const settings = createSettings({
        setting: 100,
        number: 'sdf',
      });

      expect(settings.setting).toBe(100);

      settings.configure().setting(1000);

      expect(settings.setting).toBe(1000);
    });

    it('should allow to asyncronously configure itself', async () => {
      const settings = createSettings({
        setting: 100,
      });

      expect(settings.setting).toBe(100);

      await settings.configureAsync((configurator) => {
        configurator.setting(1000);

        return Promise.resolve();
      });

      expect(settings.setting).toBe(1000);
    });

    it('should allow to asyncronously configure itself through result of configure function', async () => {
      const settings = createSettings({
        setting: 100,
      });

      expect(settings.setting).toBe(100);

      const configurator = await settings.configureAsync();

      configurator.setting(1000);

      expect(settings.setting).toBe(1000);
    });

    it('should not allow to rewrite object properties', () => {
      const settings = createSettings({
        setting: '$100',
      });

      expect(() => {
        settings.setting = '$10000';
      }).toThrowError('Cannot set property setting of #<Object> which has only a getter');

      expect(settings.setting).toBe('$100');
    });
  });

  describe('settable', () => {
    it('should allow get and set the value', () => {
      const setting = settable('pending');

      expect(setting.get()).toBe('pending');

      setting.set('resolved');

      expect(setting.get()).toBe('resolved');
    });

    it('should work with settings object', () => {
      const settings = createSettings({
        settable: settable('pending'),
      });

      expect(settings.settable.get()).toBe('pending');

      settings.settable.set('resolved');

      expect(settings.settable.get()).toBe('resolved');
    });
  });

  describe('computable', () => {
    it('should allow compute value from setting', () => {
      const settings = createSettings({
        numberA: 2,
        numberB: 3,
        result: () => settings.numberA + settings.numberB,
      });

      expect(settings.result()).toBe(5);
    });
  });
});
