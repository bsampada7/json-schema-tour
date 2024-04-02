import Ajv2020, { Schema } from "ajv/dist/2020";
const ajv2020 = new Ajv2020();
export const steps = [
  {
    title: "Create a valid schema",
    content:
      "In this step, we will create a valid schema for JSON Schema Draft 2020-12 (latest-stable).",
    examples: [
      {
        title: "String Schema",
        description: "A schema that validates a string",
        type: "string",
      },
      {
        title: "Object",
        description: "A simple object schema",
        type: "object",
        properties: {
          name: {
            description: "The name of the object",
            type: "string",
          },
        },
        required: ["name"],
      },
      {
        title: "Product",
        description: "A product from Acme's catalog",
        type: "object",
        properties: {
          productId: {
            description: "The unique identifier for a product",
            type: "integer",
          },
          productName: {
            description: "Name of the product",
            type: "string",
          },
          price: {
            description: "The price of the product",
            type: "number",
            exclusiveMinimum: 0,
          },
          tags: {
            description: "Tags for the product",
            type: "array",
            items: {
              type: "string",
            },
            minItems: 1,
            uniqueItems: true,
          },
          dimensions: {
            type: "object",
            properties: {
              length: {
                type: "number",
              },
              width: {
                type: "number",
              },
              height: {
                type: "number",
              },
            },
            required: ["length", "width", "height"],
          },
        },
        required: ["productId", "productName", "price"],
      },
    ],
    cta: [
      {
        text: "Validate",
        onClick: (schema: Schema, _: any) => {
          try {
            ajv2020.compile(schema);
            return {
              message: "Schema is valid!",
              type: "success",
            };
          } catch (e) {
            return {
              message: "Schema is invalid!",
              type: "error",
            };
          }
        },
      },
    ],
  },
  {
    title: "Create a schema for array of numbers",
    content:
      "In this step, we will create a schema that validates an array with items of type numbers.",
    examples: [
      {
        title: "Array of Numbers",
        description: "A schema that validates an array of numbers",
        type: "array",
        items: {
          type: "number",
        },
      },
    ],
    cta: [
      {
        text: "Validate",
        testCases: [
          {
            input: [],
            expected: true,
          },
          {
            input: [1, 2, 3, 4, 5],
            expected: true,
          },
          {
            input: ["1", "2", "3", "4", "5"],
            expected: false,
          },
          {
            input: [true, false],
            expected: false,
          },
          {
            input: [1.1, 2.2, 3.3, 4.4, 5.5],
            expected: true,
          },
        ],
        onClick: (schema: Schema, testCases: any) => {
          try {
            const validate = ajv2020.compile(schema);
            const results = testCases.map((testCase: any) => ({
              input: testCase.input,
              expected: testCase.expected,
              result: validate(testCase.input),
            }));

            if (
              results.every((result: any) => result.result === result.expected)
            ) {
              return {
                message: "Schema validates the given data!",
                type: "success",
              };
            } else {
              return {
                message: "Schema does not validate the given data!",
                type: "error",
              };
            }
          } catch (e) {
            return {
              message: "Schema is invalid!",
              type: "error",
            };
          }
        },
      },
    ],
  },
];

export const stepsSchema: Schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      title: { type: "string", description: "Title of the step" },
      content: { type: "string", description: "Content of the step" },
      examples: {
        type: "array",
        description: "Examples for the step",
        items: { $ref: "https://json-schema.org/draft/2020-12/schema" },
      },
      cta: {
        type: "array",
        items: {
          type: "object",
          properties: {
            text: { type: "string" },
            testCases: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  input: {},
                  expected: { type: "boolean" },
                },
                required: ["input", "expected"],
              },
              minItems: 1,
            },
            onClick: {},
          },
          required: ["text", "onClick"]
        },
      },
    },
    required: ["title", "content"],
  },
};
