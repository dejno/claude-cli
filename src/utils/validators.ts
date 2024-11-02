export function validateApiKey(key: string): boolean {
    // Basic validation for Anthropic API key format
    return /^sk-ant-api*/.test(key);
  }
  
  export function validateTemperature(temp: number): boolean {
    return temp >= 0 && temp <= 1;
  }
  
  export function validateMaxTokens(tokens: number): boolean {
    return tokens > 0 && tokens <= 4096;
  }