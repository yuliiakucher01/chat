const { By } = require('selenium-webdriver');

const signUp = By.xpath("//*[@id='nav']/a");
const scanCams = By.className("tabActiveColor transparentBg");
const nextCams = By.className("nextCamBgColor tabBorder tabActiveColor");
const sendTip = By.className("sendTipButton");
const video = By.id('vjs_video_3');

module.exports = {
  signUp,
  scanCams,
  nextCams,
  sendTip,
  video
};