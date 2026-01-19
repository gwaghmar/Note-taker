# Contributing to Smart Note AI

Thank you for considering contributing to Smart Note AI! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/gwaghmar/Note-taker/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

### Suggesting Features

1. Check if the feature has been suggested in [Issues](https://github.com/gwaghmar/Note-taker/issues)
2. If not, create a new issue with:
   - Clear description of the feature
   - Use cases
   - Why it would be valuable
   - Any potential implementation ideas

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Write/update tests if applicable
5. Ensure all tests pass (`npm test`)
6. Ensure linting passes (`npm run lint`)
7. Commit your changes (`git commit -m 'Add some feature'`)
8. Push to the branch (`git push origin feature/your-feature-name`)
9. Open a Pull Request

### Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

Quick start:
```bash
git clone https://github.com/gwaghmar/Note-taker.git
cd Note-taker
npm install
cp .env.local.example .env.local
# Edit .env.local with your credentials
npm run dev
```

### Coding Standards

- Use TypeScript for all new code
- Follow existing code style (enforced by Prettier)
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new features

### Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utilities and configurations
├── stores/          # Zustand state management
└── public/          # Static assets
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
- `feat: add tag suggestion feature`
- `fix: resolve Firebase authentication issue`
- `docs: update setup instructions`

### Testing

- Write unit tests for utility functions
- Write integration tests for API routes
- Test UI components when possible
- Ensure existing tests pass before submitting PR

### Documentation

- Update README.md if you change functionality
- Update SETUP.md if you change setup process
- Add JSDoc comments for public APIs
- Include inline comments for complex logic

## Questions?

Feel free to create an issue with the `question` label if you need help or clarification.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
