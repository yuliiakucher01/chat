const HomePage = require('../page_objects/HomePage');
const RandomRoom = require('../page_objects/RandomRoom');
const { signUp, scanCams, nextCams, sendTip, video } = require("../page_objects/PageElements");
const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');


describe('Chaturbate UI Tests', function() {
	let driver;
	let homePage;
	let randomRoom;
	//let buttons;
  
// setup browser and navigate to the home page before running any test  
	before(async function() {
		driver = await new Builder().forBrowser('chrome').build();
		this.driver = driver;
		homePage = new HomePage(driver);
		randomRoom = new RandomRoom(driver);
		await homePage.navigateToHomePage();
		await randomRoom.openRandomRoom();
	});

 // close browser window after all tests
	after(async function() {
		await driver.quit()
	});
// Verifying the elements present on the page and video stream is playing

	describe('Verifying the elements present on the page and video stream is playing', function() {

		it('Verify "Sign Up" button is present on the page', async function() { 	 
			const signUpButton = await driver.findElement(signUp);
			assert.ok(signUpButton);
		});

		it('Verify "Scan Cams" is present on the page', async function(){
			const scanCamsbutton = await driver.findElement(scanCams);
			assert.ok(scanCamsbutton);
		});

		it('Verify "Next Cams" is present on the page', async function(){
			const nextCamsbutton = await driver.findElement(nextCams);
			assert.ok(nextCamsbutton);
		});

		it('Verify "Send Tip Button" is present on the page', async function(){
			const sendTipButton = await driver.findElement(sendTip);
			assert.ok(sendTipButton);
		});
	  
		it('Verify "The video stream is currently playing"', async function() {
			await driver.sleep(2000);
			const videoElement = await driver.findElement(video);
			const videoState = await videoElement.getAttribute('class');
			const isPlaying = videoState.split(' ').includes("vjs-playing");
			assert.strictEqual(isPlaying, true, "The video stream is not playing");
		});
	});
  
// Veryfying that user navigates to different pages on clicking "Scan Cams" button
	describe('Verifying navigation', function() {
		it('Verifies user navigates to different pages on clicking "Scan Cams" button', async function() {
			let urls = [];
			let hasDuplicate = false;
			
			for (let i = 0; i < 3; i++) {
				await driver.sleep(5000);
				await driver.findElement(scanCams).click();

				const currentUrl = await driver.getCurrentUrl();
				if (urls.includes(currentUrl)) {
					hasDuplicate = true;
					break;
				}
				urls.push(currentUrl);
			}
			assert.strictEqual(hasDuplicate, false, "The user should be on a different page after clicking the Scan Cams button");
		});
	});
});
