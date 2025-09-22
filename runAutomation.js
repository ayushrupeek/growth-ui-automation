// Option 1: Run all workflows
const automation = new LoanAutomation();
await automation.run();

// Option 2: Run specific loan types
await automation.createFreshLoan();
await automation.createTakeOverLoan();

// Option 3: Import and customize
const { LoanAutomation, CONFIG } = require('./loan-automation');
CONFIG.CUSTOMERS.primary = 'your-customer-number';