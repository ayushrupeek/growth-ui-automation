# 🏦 Growth-UI Automation

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-21%2B-blue.svg)](https://pptr.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A comprehensive automation solution for loan application workflows using Puppeteer. This tool automates the creation of various loan types including fresh loans, takeover loans, coborrower loans, and ITO (Internal Take Over) loans.

## ✨ Features

- 🔄 **Multiple Loan Types**: Fresh, Takeover, Coborrower, and ITO loans
- 🛡️ **Robust Error Handling**: Graceful failure recovery and detailed logging
- ⚡ **Smart Waiting**: Intelligent element waiting instead of arbitrary delays
- 🎯 **Modular Design**: Clean, maintainable, and extensible code structure
- 📊 **Comprehensive Logging**: Detailed execution tracking and debugging information
- 🔧 **Easy Configuration**: Centralized config management for all parameters
- 🎨 **Production Ready**: Enterprise-level error handling and resource management

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/loan-automation.git
cd loan-automation

# Install dependencies
npm install

# Install Puppeteer (if not included)
npm install puppeteer
```

### Basic Usage

```bash
# Run all loan automation workflows
node loan-automation.js
```

## 📖 Usage Examples

### Run All Workflows

```javascript
const { LoanAutomation } = require('./loan-automation');

async function runAllLoans() {
    const automation = new LoanAutomation();
    try {
        await automation.run();
    } catch (error) {
        console.error('Automation failed:', error);
    }
}

runAllLoans();
```

### Run Specific Loan Types

```javascript
const { LoanAutomation } = require('./loan-automation');

async function runSpecificLoan() {
    const automation = new LoanAutomation();
    
    try {
        await automation.initialize();
        await automation.login();
        await automation.searchCustomer('9717765633');
        
        // Run specific loan types
        await automation.createFreshLoan();
        await automation.createTakeOverLoan();
        await automation.createCoborrowerFreshLoan();
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await automation.cleanup();
    }
}

runSpecificLoan();
```

### Custom Configuration

```javascript
const { LoanAutomation, CONFIG } = require('./loan-automation');

// Modify configuration
CONFIG.CUSTOMERS.primary = '9876543210';
CONFIG.CUSTOMERS.coborrower = '9123456780';
CONFIG.FORM_DEFAULTS.loanAmount = '100000';

// Add new loan configuration
CONFIG.LOAN_CONFIGS.custom = {
    type: 'CUSTOM_LOAN',
    lender: 'custom_lender_id',
    branch: 'custom_branch_id',
    scheme: 'CUSTOM_SCHEME'
};

const automation = new LoanAutomation();
automation.run();
```

## 🏗️ Architecture

### Core Components

```
loan-automation/
├── loan-automation.js          # Main automation script
├── package.json               # Dependencies and scripts
├── README.md                  # This file
└── docs/                      # Additional documentation
    ├── API.md                 # API documentation
    └── CONFIGURATION.md       # Configuration guide
```

### Class Structure

- **`LoanAutomation`**: Main orchestrator class
- **`PageUtils`**: Utility class for page interactions
- **`CONFIG`**: Centralized configuration object
- **`SELECTORS`**: XPath selectors for UI elements

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application URLs
BASE_URL=https://growth-red-qa.rupeek.co/
SEARCH_URL=https://growth-red-qa.rupeek.co/search-loans-by-customer

# Credentials
USERNAME=your_username
PASSWORD=your_password

# Customer Numbers
PRIMARY_CUSTOMER=9717765633
COBORROWER_CUSTOMER=9328674769

# Browser Settings
HEADLESS=false
SLOW_MO=100
```

### Loan Configurations

Modify `CONFIG.LOAN_CONFIGS` to add or update loan types:

```javascript
CONFIG.LOAN_CONFIGS.newLoanType = {
    type: 'NEW_LOAN_TYPE',
    lender: 'lender_id',
    branch: 'branch_id',
    scheme: 'scheme_code'
};
```

## 🎯 Available Loan Types

| Loan Type | Method | Description |
|-----------|--------|-------------|
| Fresh Loan | `createFreshLoan()` | Creates a new loan application |
| Takeover Loan | `createTakeOverLoan()` | Creates a loan takeover application |
| Coborrower Fresh | `createCoborrowerFreshLoan()` | Fresh loan with coborrower |
| Coborrower TO | `createCoborrowerTOLoan()` | Takeover loan with coborrower |
| ITO Loan | `createITOLoan()` | Internal takeover loan |

## 🔧 API Reference

### LoanAutomation Class

#### Methods

##### `initialize()`
Initializes the browser and page instances.

```javascript
await automation.initialize();
```

##### `login()`
Performs login to the application.

```javascript
await automation.login();
```

##### `searchCustomer(customerNumber)`
Searches for a specific customer.

```javascript
await automation.searchCustomer('9717765633');
```

##### `createLoan(loanConfig, isCoborrowerloan, coborrowerNumber)`
Creates a loan with the specified configuration.

```javascript
await automation.createLoan(CONFIG.LOAN_CONFIGS.fresh, false, null);
```

### PageUtils Class

#### Methods

##### `waitAndInteract(selector, action, value, timeout)`
Waits for an element and performs the specified action.

```javascript
await utils.waitAndInteract(selector, 'click');
await utils.waitAndInteract(selector, 'type', 'some text');
await utils.waitAndInteract(selector, 'select', 'option_value');
```

## 🐛 Troubleshooting

### Common Issues

#### Browser Won't Launch
```bash
# Install Chromium dependencies (Ubuntu/Debian)
sudo apt-get install chromium-browser

# Install dependencies (CentOS/RHEL)
sudo yum install chromium
```

#### Selector Not Found
- Check if the webpage structure has changed
- Update XPath selectors in `SELECTORS` object
- Increase timeout values in `CONFIG.TIMEOUTS`

#### Login Failures
- Verify credentials in `CONFIG.CREDENTIALS`
- Check if CAPTCHA is enabled on the login page
- Ensure the login URL is correct

### Debug Mode

Enable debug mode for detailed logging:

```javascript
const automation = new LoanAutomation();
automation.debugMode = true;
await automation.run();
```

## 📊 Logging

The automation provides comprehensive logging:

- **Info**: General execution flow
- **Success**: Completed operations (✓)
- **Warnings**: Non-critical issues
- **Errors**: Critical failures (✗)

### Log Examples

```
--- Executing: Fresh Loan ---
Creating FRESH loan...
✓ Fresh Loan completed successfully

--- Executing: Take Over Loan ---
Creating TAKE_OVER loan...
✗ Take Over Loan failed: Selector not found

🎉 All loan automation workflows completed!
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["node", "loan-automation.js"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/automation.yml
name: Loan Automation

on:
  schedule:
    - cron: '0 9 * * 1-5'  # Run weekdays at 9 AM
  workflow_dispatch:

jobs:
  automation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: node loan-automation.js
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
```

## 📋 Roadmap

- [ ] **Parallel Processing**: Execute multiple loan types simultaneously
- [ ] **Data Export**: Export loan application data to CSV/Excel
- [ ] **Email Notifications**: Send completion reports via email
- [ ] **Dashboard Integration**: Web-based monitoring dashboard
- [ ] **Mobile Support**: Responsive design for mobile devices
- [ ] **Advanced Scheduling**: Cron-based scheduling with retries
- [ ] **Database Integration**: Store automation results in database

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Puppeteer](https://pptr.dev/) - Headless Chrome Node.js API
- [Node.js](https://nodejs.org/) - JavaScript runtime
- Contributors and maintainers

## 📞 Support

- 📧 Email: support@yourcompany.com
- 💬 Slack: #automation-support
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/loan-automation/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/loan-automation/wiki)

## 📈 Statistics

![GitHub stars](https://img.shields.io/github/stars/your-username/loan-automation)
![GitHub forks](https://img.shields.io/github/forks/your-username/loan-automation)
![GitHub issues](https://img.shields.io/github/issues/your-username/loan-automation)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/loan-automation)

---

<div align="center">
  <strong>Built with ❤️ for automation excellence</strong>
</div>

<div align="center">
  <a href="#top">Back to top</a>
</div>
