import { validateApiKey, validateTemperature, validateMaxTokens } from '../validators';

describe('Validators', () => {
  describe('validateApiKey', () => {
    it('should accept valid Anthropic API key format', () => {
      expect(validateApiKey('sk-ant-api03-abc123')).toBe(true);
    });

    it('should accept key starting with sk-ant-api', () => {
      expect(validateApiKey('sk-ant-api-test-key-xyz')).toBe(true);
    });

    it('should reject empty string', () => {
      expect(validateApiKey('')).toBe(false);
    });

    it('should reject keys with wrong prefix', () => {
      expect(validateApiKey('sk-openai-abc123')).toBe(false);
    });

    it('should reject random strings', () => {
      expect(validateApiKey('not-a-valid-key')).toBe(false);
    });
  });

  describe('validateTemperature', () => {
    it('should accept 0', () => {
      expect(validateTemperature(0)).toBe(true);
    });

    it('should accept 1', () => {
      expect(validateTemperature(1)).toBe(true);
    });

    it('should accept 0.5', () => {
      expect(validateTemperature(0.5)).toBe(true);
    });

    it('should reject negative values', () => {
      expect(validateTemperature(-0.1)).toBe(false);
    });

    it('should reject values above 1', () => {
      expect(validateTemperature(1.1)).toBe(false);
    });
  });

  describe('validateMaxTokens', () => {
    it('should accept 1', () => {
      expect(validateMaxTokens(1)).toBe(true);
    });

    it('should accept 4096', () => {
      expect(validateMaxTokens(4096)).toBe(true);
    });

    it('should accept values in range', () => {
      expect(validateMaxTokens(2048)).toBe(true);
    });

    it('should reject 0', () => {
      expect(validateMaxTokens(0)).toBe(false);
    });

    it('should reject negative values', () => {
      expect(validateMaxTokens(-1)).toBe(false);
    });

    it('should reject values above 4096', () => {
      expect(validateMaxTokens(4097)).toBe(false);
    });
  });
});
