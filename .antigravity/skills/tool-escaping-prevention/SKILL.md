---
name: tool-escaping-prevention
description: "Prevents unnecessary escaping of backticks and template string variables when using file editing tools."
---

# Tool Escaping Prevention

This skill is automatically triggered to prevent a common mistake when replacing or writing code content using the Antigravity system tools (like `replace_file_content`, `multi_replace_file_content`, or `write_to_file`).

## The Problem
When generating Javascript/Typescript template literals via tools, there is a tendency to escape backticks (`\``) and dollar signs (`\$`) because they are special characters in bash or JSON. However, the system's tools already handle JSON payload escaping internally.

**Incorrect Output:**
```typescript
const url = \`https://api.example.com/user/\${userId}\`;
```
*This results in a literal backslash being written into the Typescript file, causing a syntax error.*

## The Rule
When using `replace_file_content`, `multi_replace_file_content`, or `write_to_file` to write code containing template literals:
1. **DO NOT** escape backticks: Use ``` ` ``` instead of ``` \` ```
2. **DO NOT** escape variables: Use ``` ${var} ``` instead of ``` \${var} ```
3. Provide the raw, exact source code as it should appear in the final file.

**Correct Output:**
```typescript
const url = `https://api.example.com/user/${userId}`;
```

## Self-Check
Before submitting a code block replacement that includes a template literal, verify that there are no stray backslashes before backticks or variables in the payload you are about to send to the tool.
