import { slugify, truncate } from "./helpers.js";

const slug: string = slugify("Hello World");
const short: string = truncate("This is a long text", 10);

console.log(slug);
console.log(short);

/*
In a .js file, TypeScript can figure out some return types on its own,
but the type information is often limited. After converting helpers.js
to helpers.ts and adding types, the code becomes easier to understand
and TypeScript can catch mistakes much earlier.

A .d.ts file only contains type definitions and no actual code. It is
helpful during migration because it lets TypeScript understand the shape
of existing JavaScript code without needing to convert everything to
TypeScript right away.

*/