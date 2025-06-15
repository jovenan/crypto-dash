# Crypto Dashboard

A modern and interactive cryptocurrency dashboard built with Next.js, allowing users to track real-time prices, visualize market trends, and make informed investment decisions.

![Dashboard Preview](path/to/dashboard-preview.png)
![Coin Details Preview](path/to/coin-details-preview.png)

## Features

- 📊 Real-time cryptocurrency price tracking
- 📈 Interactive price charts with historical data
- 🔍 Advanced filtering and sorting capabilities
- ⚡ Fast and efficient data loading
- 🎨 Modern and clean user interface

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- CoinGecko API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-dash.git
cd crypto-dash
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Development Commands

#### Running Tests
```bash
# Run all tests
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch
```

#### Linting
```bash
# Run ESLint to check for code issues
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard page
│   └── crypto/[id]/       # Individual coin details page
├── components/            # React components
│   ├── crypto-dashboard/  # Dashboard related components
│   ├── crypto-details/    # Coin details components
│   ├── ui/               # Reusable UI components
│   └── common/           # Common components
├── services/             # API services
│   ├── list-coins.ts     # Coin listing service
│   ├── get-coin.ts       # Individual coin service
│   └── get-coin-chart.ts # Chart data service
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## Contributing

We welcome contributions to improve the Crypto Dashboard! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting a PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for providing cryptocurrency data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for chart components
