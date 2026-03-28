import { tools } from '../definitions';

describe('Tool Definitions', () => {
  it('should define all expected tools', () => {
    expect(Object.keys(tools)).toEqual(['emailSender', 'stockPrice', 'weatherInfo']);
  });

  describe('emailSender tool', () => {
    const tool = tools.emailSender;

    it('should have correct name', () => {
      expect(tool!.name).toBe('send_email');
    });

    it('should have a description', () => {
      expect(tool!.description).toBeTruthy();
    });

    it('should have required input_schema properties', () => {
      const schema = tool!.input_schema;
      expect(schema.type).toBe('object');
      expect(schema.properties).toBeDefined();
      expect(schema.properties!.to).toBeDefined();
      expect(schema.properties!.subject).toBeDefined();
      expect(schema.properties!.body).toBeDefined();
    });

    it('should require to, subject, and body', () => {
      expect(tool!.input_schema.required).toEqual(['to', 'subject', 'body']);
    });

    it('should have priority as optional enum', () => {
      const priority = tool!.input_schema.properties!.priority as any;
      expect(priority.enum).toEqual(['low', 'normal', 'high']);
    });
  });

  describe('stockPrice tool', () => {
    const tool = tools.stockPrice;

    it('should have correct name', () => {
      expect(tool!.name).toBe('get_stock_price');
    });

    it('should require symbol', () => {
      expect(tool!.input_schema.required).toEqual(['symbol']);
    });

    it('should have include_details as optional boolean', () => {
      const includeDetails = tool!.input_schema.properties!.include_details as any;
      expect(includeDetails.type).toBe('boolean');
    });
  });

  describe('weatherInfo tool', () => {
    const tool = tools.weatherInfo;

    it('should have correct name', () => {
      expect(tool!.name).toBe('get_weather');
    });

    it('should require location', () => {
      expect(tool!.input_schema.required).toEqual(['location']);
    });

    it('should have units as optional enum', () => {
      const units = tool!.input_schema.properties!.units as any;
      expect(units.enum).toEqual(['metric', 'imperial']);
    });
  });

  describe('all tools have valid schemas', () => {
    Object.entries(tools).forEach(([key, tool]) => {
      it(`${key} should have a name`, () => {
        expect(tool.name).toBeTruthy();
        expect(typeof tool.name).toBe('string');
      });

      it(`${key} should have a description`, () => {
        expect(tool.description).toBeTruthy();
      });

      it(`${key} should have a valid input_schema`, () => {
        expect(tool.input_schema.type).toBe('object');
        expect(tool.input_schema.properties).toBeDefined();
        expect(Array.isArray(tool.input_schema.required)).toBe(true);
      });
    });
  });
});
