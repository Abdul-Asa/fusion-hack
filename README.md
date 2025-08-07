# Money Trees 🌱💰

> _"A dollar might turn to a million and we all rich"_

**Keep track of your finances and watch them grow** — A modern financial tracking application that embraces the garden metaphor for financial growth, built with data ownership and portability at its core.

![Money Trees Banner](./public/main.png)

## Philosophy: File Over App

Money Trees is built around the **"File Over App"** philosophy, as championed by Steph Ango, CEO of Obsidian:

> _"File over app is a philosophy: if you want to create digital artifacts that last, they must be files you can control, in formats that are easy to retrieve and read. Use tools that give you this freedom."_

### Why This Matters for Your Financial Data

- **📁 Your Data, Your Control**: All financial data can be exported as standard CSV files
- **🔄 No Lock-in**: Switch to any other financial tool without losing your history
- **🕰️ Future-Proof**: CSV format has existed for decades and will outlast any app
- **🔒 Privacy First**: Your financial data stays on your device and in formats you control
- **🌍 Universally Readable**: Open your data in Excel, Google Sheets, or any text editor

> _"In the fullness of time, the files you create are more important than the tools you use to create them. Apps are ephemeral, but your files have a chance to last."_ — Steph Ango

## Features

### 🌱 Garden Visualization

- Interactive canvas showing your financial growth as a flourishing garden
- Visual metaphors that make tracking finances engaging and intuitive
- Real-time collaboration features for shared financial planning

### 📊 Data Management

- **Import**: Seamlessly import existing financial data via CSV
- **Export**: Download your complete financial history anytime
- **Multi-Currency**: Support for USD, EUR, GBP, JPY, NGN, and more
- **Real-time Sync**: Collaborative features using Liveblocks technology

### 🎯 Smart Organization

- Track expenses by category, date, and amount
- Built-in statistics and growth visualization
- Mobile-responsive design for tracking on the go

## Tech Stack

Money Trees leverages modern, reliable technologies while maintaining data portability:

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Jotai for reactive state
- **Real-time Features**: Liveblocks for collaboration
- **Data Processing**: CSV parsing and generation
- **UI Components**: Radix UI for accessibility
- **Visualization**: Custom canvas implementation with Spline integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fusion-hack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Add your Liveblocks public key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Initial Setup

1. **Configure Your Profile** (`/garden/settings`)

   - Enter your name
   - Select your preferred currency
   - Choose your currency symbol

2. **Import Your Data** (`/garden/import`)

   - Upload existing financial data via CSV
   - Required columns: `date`, `description`, `amount`, `category`

3. **Start Growing Your Garden** (`/garden`)
   - Watch your financial data come to life in the garden visualization
   - Add new transactions and see your money tree grow

## File Formats & Data Portability

### CSV Structure

Your financial data uses a simple, universal format:

```csv
date,description,amount,category,id
2024-01-15,"Coffee Shop",4.50,"Food",uuid-1234
2024-01-15,"Salary",3000.00,"Income",uuid-5678
2024-01-16,"Rent",1200.00,"Housing",uuid-9012
```

### Export Your Data

- Visit `/garden/import` and click "Export your data as a CSV file"
- Your complete financial history downloads instantly
- Use this data in any financial software, spreadsheet, or analytics tool

### Data Ownership Principles

1. **No Vendor Lock-in**: All data exportable in standard formats
2. **Local Storage**: Core data stored locally first, synced optionally
3. **Open Formats**: CSV for transactions, JSON for settings
4. **Full Access**: Every piece of data is accessible and exportable
5. **Privacy by Design**: No tracking, no data harvesting

## Contributing

We welcome contributions that align with our file-over-app philosophy:

1. **Maintain Data Portability**: Any new feature should preserve export/import capabilities
2. **Use Open Standards**: Prefer standard file formats and protocols
3. **Document Data Structures**: Clearly document any new data formats
4. **Test Data Migration**: Ensure updates don't break existing data

### Development Guidelines

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Start production server
npm start
```

## Architecture Decisions

### Why These Technologies?

- **Next.js**: Modern React framework with excellent performance
- **CSV**: Universal, human-readable data format that will outlast any proprietary format
- **Jotai**: Atomic state management for predictable data flow
- **Liveblocks**: Real-time collaboration without compromising data ownership
- **TypeScript**: Type safety for robust financial calculations

### File Structure Philosophy

```
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── lib/                    # Utilities and hooks
├── public/                 # Static assets
└── export.csv             # Your exportable data lives here
```

## Inspiration & Philosophy

Money Trees draws inspiration from the **File Over App** movement, recognizing that:

- Financial data is too important to be locked in proprietary formats
- Users should own their data completely
- Tools should enhance human capability without creating dependency
- Simple, open formats often outlast complex, proprietary ones

> _"These days I write using an app I help make called Obsidian, but it's a delusion to think it will last forever. The app will eventually become obsolete. It's the plain text files I create that are designed to last."_ — Steph Ango

## License

MIT License - Your data, your rules.

## Acknowledgments

- **Steph Ango** for the File Over App philosophy
- **The Obsidian Team** for demonstrating how to build tools that respect user data ownership
- **The Open Source Community** for creating the technologies that make data portability possible

---

_Made with 💜 by Shehu — A certified Shehu Product_

**Remember**: Apps are temporary, but your financial data should be permanent. Choose tools that give you freedom. 🌱
