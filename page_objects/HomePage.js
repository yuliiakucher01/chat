const { By, until } = require('selenium-webdriver');

class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateToHomePage() {
    await this.driver.get('http://chaturbate.com/');
	await this.driver.findElement(By.id('close_entrance_terms')).click();
    return this;
  }
}

module.exports = HomePage;