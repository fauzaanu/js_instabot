import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com", {
    waitUntil: "networkidle0",
  });

  const login_field = await page.$x(
    "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[1]/div/label/input"
  );

  const password_field = await page.$x(
    "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[2]/div/label/input"
  );

  // console.log(example);
  await login_field[0].type("clearly_not_my_login");
  await password_field[0].type("clearlynotmypassword");

  const login_button = await page.$x(
    "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[3]/button"
  );

  await login_button[0].click();
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  await page.screenshot({ path: "example.png" });

  // reload page
  await page.goto("https://www.instagram.com/explore/", {
    waitUntil: "networkidle0",
  });

  // back to feed page
  await page.goto("https://www.instagram.com/", {
    waitUntil: "networkidle0",
  });

  //   // skip turn on notifications
  //   const skip_button = await page.$x(
  //     "/html/body/div[4]/div/div/div/div[3]/button[2]"
  //   );

  //   await skip_button[0].click();

  const followfun = async () => {
    //find follow buttons
    const follow_buttons = await page.$x(
      "//button//div[contains(text(),'Follow')]"
    );
    // click follow buttons
    for (let i = 0; i < follow_buttons.length; i++) {
      try {
        await follow_buttons[i].click();
      } catch {
        followfun();
        break;
      }
    }
  };

  await followfun();

  await browser.close();
})();
