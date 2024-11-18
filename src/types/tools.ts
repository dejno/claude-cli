// src/types/tools.ts
export type ToolType = 'function';

export interface ToolParameter {
  type: string;
  description?: string;
  enum?: string[];
}

export interface ToolFunctionParameters {
  type: 'object';
  properties: Record<string, ToolParameter | { 
    type: string;
    items?: any;
    description?: string;
    enum?: string[];
  }>;
  required: string[];
}

export interface ToolFunction {
  name: string;
  description: string;
  parameters: ToolFunctionParameters;
}

export interface ToolDefinition {
  type: ToolType;
  function: ToolFunction;
}

export interface ToolCallResult {
  tool_call_id: string;
  name: string;
  response: any;
}

export interface ToolCall {
  id: string;
  type: ToolType;
  function: {
    name: string;
    arguments: string;
  };
}
