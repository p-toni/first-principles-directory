# First Principles Directory

A curated directory of problems solved through first principles thinking. This project aims to showcase real-world examples of first principles thinking across various domains, demonstrating how complex challenges can be broken down into fundamental truths and rebuilt from the ground up.

# How to Contribute

To submit a new problem example, please follow these guidelines:

Each problem documented should follow these key aspects of first principles thinking:

1. Problem Statement: Clear articulation of the challenge
2. Fundamental Truths: Basic, irrefutable facts relevant to the problem
3. Bottom-up Reasoning: How the solution was built from these fundamental truths
4. Assumptions Challenged: Traditional approaches that were questioned
5. Novel Solutions: New approaches derived from first principles

File Format

The .txt file should be placed in the /problems directory
of our GitHub repository. You can use the example file as a starting point.

Content Quality

Focus on clear, precise language
Include concrete examples and evidence
Maintain explicit connections to fundamental principles

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/p-toni/first-principles-directory.git
cd first-principles-directory
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration.

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Tech Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- Radix UI Components
- KaTeX for mathematical expressions
- P5.js for visualizations
- Jest for testing
