const puppeteer = require('puppeteer');

const xpath = {
    username: '::-p-xpath(/html/body/div/div/div/div[2]/div/form/div[2]/input)',
    password: '::-p-xpath(/html/body/div/div/div/div[2]/div/form/div[3]/input)',
    submit: '::-p-xpath(/html/body/div/div/div/div[2]/div/form/div[4]/button)',
    enterCustomerNumber: '::-p-xpath(/html/body/div/div/div[2]/main/div/div/div/div[1]/div[1]/div[1]/input)',
    searchNumber: '::-p-xpath(/html/body/div/div/div[2]/main/div/div/div/div[1]/div[1]/button)',
    createLoanButton: '::-p-xpath(/html/body/div/div/div[2]/main/div/div/div/div[2]/div[5]/div/div[2]/div/div/div/div[2]/button)',
    loanType: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[1]/div[3]/select)',
    loanAmount: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[1]/div[4]/input)',
    loanReason: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[1]/div[5]/select)',
    transactionPlaceType: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[2]/div[3]/select)',
    applicationType: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[2]/div[4]/div/select)',
    lender: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[2]/div[1]/select)',
    branch: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[2]/div[2]/select)',
    scheme: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[3]/div[1]/select)',
    submitLoanDetails: '::-p-xpath(/html/body/div[2]/div[1]/div/div/div/div/div/div[4]/div[2]/button[1])',
    loanApplicationList: '::-p-xpath(/html/body/div/div/div[2]/main/div/div/div/div[2]/div[5]/div/div[2]/div/div/div/div[1]/div/div[1]/header/div)'
}; 

const formParameters = {
    loanAmount: "54321",
    loanReason: "OTHERS",
    applicationType: "PRIMARY",
    transactionPlaceType: "BRANCH_WALKIN",

};

let page; 
(async () => {
    let browser;
    try {
      browser = await puppeteer.launch({
        //headless: 'new', // or true for older versions
        // Uncomment to see the browser (for debugging)
        headless: false,
        slowMo: 10, // Slow down actions for debugging
      });
      page = await browser.newPage();
  
      // Your UI testing logic will go here...
      await page.goto('https://growth-red-qa.rupeek.co/'); 

      const usernameInput =  await page.waitForSelector(xpath.username);
      const passwordInput = await page.waitForSelector(xpath.password);
      const submit  = await page.waitForSelector(xpath.submit); 
      
      await usernameInput.type('qaadmin');
      await passwordInput.type('1234567');
      await submit.click();

      await Promise.all([
        page.waitForNavigation(),
      ]);
      await page.goto('https://growth-red-qa.rupeek.co/search-loans-by-customer'); 

      const primaryCustomer = '9717765633';
      const coborrowerCustomer = '9328674769'
      const enterCustomerNumberInput = await page.waitForSelector(xpath.enterCustomerNumber); 
      await enterCustomerNumberInput.type(primaryCustomer);

      const searchInput = await page.waitForSelector(xpath.searchNumber); 
      await searchInput.click(); 
      
      setTimeout(async() => {
        const createLoanButton = await page.waitForSelector(xpath.createLoanButton);
        await createLoanButton.click();
        createFreshLoan();
        createTakeOverLoan();
        createCoborrowerLoan();
        createCoborrowerFreshLoan();
        createCoborrowerTOLoan();
        createITOLoan()
      }, 3000); 
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      if (browser) {
        //await browser.close();
      }
    }
  })();

  const createFreshLoan = async() => {
    try {
        const loanType = "FRESH";
        const rupeekLender = "5b5b1f808ca5d06304f47cde";
        const rupeekBranch = "5c494582eb6b2bb14518f7ec"; 
        const scheme = "ANM67AYC"; 
        createLoan(loanType, rupeekLender, rupeekBranch, scheme);
        const loanApplicationList = await page.waitForSelector(xpath.loanApplicationList);
        setTimeout(async () => {
            await loanApplicationList.click(); 
        }, 1000); 
        
    } catch (error) {
        console.log("error in creating fresh loan", error); 
    }
  };

  const createTakeOverLoan = async() => {


  };

  const createCoborrowerLoan = async() => {

  };

  const createCoborrowerFreshLoan = async() => {

  };
  
  const createCoborrowerTOLoan = async() => {

  };

  const createITOLoan = async() => {

  };

  const createLoan = async(loanType, rupeekLender, rupeekBranch, scheme) => {

    try {
        const loanTypeInput = await page.waitForSelector(xpath.loanType);
        const loanAmountInput = await page.waitForSelector(xpath.loanAmount);
        const loanReasonInput = await page.waitForSelector(xpath.loanReason);
        const rupeekLenderInput = await page.waitForSelector(xpath.lender);
        const rupeekBranchInput = await page.waitForSelector(xpath.branch);
        const schemeInput = await page.waitForSelector(xpath.scheme); 
        const submitLoan = await page.waitForSelector(xpath.submitLoanDetails);

        await page.select(xpath.loanType, loanType);
        await loanAmountInput.type(formParameters.loanAmount);
        setTimeout(async() => {
            await page.select(xpath.loanReason, formParameters.loanReason);
            await submitLoan.click();
            setTimeout(async() => {
                await page.select(xpath.lender, rupeekLender);
                await submitLoan.click();
                setTimeout(async() => {
                    await page.select(xpath.scheme, scheme);
                    setTimeout(async() => {
                        
                        await page.select(xpath.branch, rupeekBranch);
                        await page.select(xpath.transactionPlaceType, formParameters.transactionPlaceType);
                        await page.select(xpath.applicationType, formParameters.applicationType);
                        await submitLoan.click();
                    }, 1000);
                }, 2000);

            }, 2000);
        }, 1000);
    } catch (error) { 
        throw new Error(`Error in create loan function ${error}`); 
    }
  };