const { By, until } = require('selenium-webdriver');
const assert = require('assert');

class RandomRoom {	
  constructor(driver) {
    this.driver = driver;
  }

  async openRandomRoom() {
    let roomCards = await this.driver.findElements(By.className('room_list_room'));
    let randomIndex = Math.floor(Math.random() * roomCards.length);
    let selectedRoom = roomCards[randomIndex];
	let roomNameOnCard = await selectedRoom.findElement(By.css('.title')).getText();
	
    await selectedRoom.click();

    let currentUrl = await this.driver.getCurrentUrl();
    let roomNameInUrl = currentUrl.split('/')[3];
    
	assert.strictEqual(roomNameOnCard.startsWith(roomNameInUrl), true);
  }
}

module.exports = RandomRoom;