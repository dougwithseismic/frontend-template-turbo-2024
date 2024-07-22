import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("feature-folder", {
    description: "Create a new feature folder structure",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your feature?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/types/index.ts",
        templateFile: "plop-templates/types.ts.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/api/{{kebabCase name}}-api.ts",
        templateFile: "plop-templates/api.ts.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/hooks/use-{{kebabCase name}}-operations.ts",
        templateFile: "plop-templates/hooks.ts.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/context/{{kebabCase name}}-context.tsx",
        templateFile: "plop-templates/context.tsx.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/components/{{kebabCase name}}-list.tsx",
        templateFile: "plop-templates/list.tsx.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/components/{{kebabCase name}}-item.tsx",
        templateFile: "plop-templates/item.tsx.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/components/{{kebabCase name}}-list.stories.tsx",
        templateFile: "plop-templates/list.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/components/{{kebabCase name}}-item.stories.tsx",
        templateFile: "plop-templates/item.stories.tsx.hbs",
      },
    ],
  });
}
