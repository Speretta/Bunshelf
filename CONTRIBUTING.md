# Contributing to Bunshelf

Thank you for your interest in contributing to Bunshelf! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/speretta/bunshelf/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment (OS, Bun version, etc.)

### Suggesting Features

1. Open an issue with the label `enhancement`
2. Describe the feature and its use case
3. Explain why it would benefit the project

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure tests pass (`bun test`)
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0
- Git

### Installation

```bash
git clone https://github.com/speretta/bunshelf.git
cd bunshelf
bun install
```

### Development Commands

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun test

# Run tests in watch mode
bun test --watch

# Type check
bun run typecheck
```

## Project Structure

```
bunshelf/
├── src/
│   ├── cli.ts           # CLI entry point
│   ├── server.ts        # Development server
│   ├── ssg/             # Static site generation
│   │   ├── builder.ts   # Build logic
│   │   └── preview.ts   # Preview server
│   ├── core/            # Core functionality
│   │   ├── renderer/    # Page rendering
│   │   └── constants/   # Default values, CDN URLs
│   ├── markdown/        # Markdown parsing
│   ├── themes/          # Theme definitions
│   ├── i18n/            # Internationalization
│   ├── search/          # Search indexing
│   ├── templates/       # HTML templates
│   ├── sidebar/         # Sidebar generation
│   └── utils/           # Utility functions
├── public/              # Static assets
├── dist/                # Build output (gitignored)
└── docs/                # Documentation content
```

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Use explicit return types for public functions
- Avoid `any` - use `unknown` when type is uncertain

### Code Style

- Use 2-space indentation
- Use semicolons
- Use single quotes for strings
- Add JSDoc comments for public APIs

### Testing

- Write tests for all new functionality
- Place test files next to the source file (`*.test.ts`)
- Use Bun's built-in test runner
- Aim for high coverage on utility functions

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Publish to npm

## Questions?

Feel free to open an issue or start a discussion on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
