const puppeteer = require("puppeteer");
const xlsx = require("node-xlsx");
const { delay } = require("../utils/index");
const startRegister = async path => {
  var obj = xlsx.parse(path + "/file.xlsx");
  const filterData = obj[0].data.filter(f => f.length > 0);
  let puppeteerBrowser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"]
  });
  const browser = puppeteerBrowser;

  for (let i = 0; i < filterData.length; ) {
    if (i > 0) {
      const getRegister = await bindingData(
        browser,
        puppeteerBrowser,
        filterData[i]
      );
      if (getRegister === "success") {
        i++;
      }
    }
    if (i === 0) {
      i++;
    }
  }
};
const bindingData = async (browser, puppeteerBrowser, data) => {
  return new Promise(async resolve => {
    const pageRegister = await browser.newPage();
    puppeteerBrowser.page = pageRegister;
    const override = Object.assign(pageRegister.viewport(), {
      width: 1920,
      height: 1080
    });
    try {
      await pageRegister.setViewport(override);
      await pageRegister.goto("https://www.prakard.com/ucp.php?mode=register", {
        waitUntil: "load",
        timeout: 0
      });
      await pageRegister.click('input[name="agreed"]');
      await delay(1000);
      await pageRegister.type('input[name="username"]', data[0]);
      await pageRegister.type('input[name="email"]', data[1]);
      await pageRegister.type('input[name="new_password"]', data[2]);
      await pageRegister.type('input[name="password_confirm"]', data[2]);
      pageRegister.on("response", async response => {
        // if (response.url().endsWith("your/match"))
        if (
          response.url() === "https://www.prakard.com/ucp.php?mode=register"
        ) {
          const getText = await response.text();
          if (
            getText.includes(
              "Your account has been created. However, this board requires account activation. An activation key has been sent to the email address you provided. Please check your email for further information and also be sure to check your junk mail box. It may take a while to get the email depending on your email provider"
            )
          ) {
            console.log("register success");
            await delay(1000);
            pageRegister.close();
            resolve("success");
          } else {
            resolve("error");
          }
        }
      });
    } catch (e) {
      pageRegister.close();
      resolve("error");
    }
  });
};
module.exports = { startRegister };
