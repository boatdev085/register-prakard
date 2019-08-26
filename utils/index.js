function getPage(state) {
  /** @type {import('puppeteer').Page} */
  const page = state.page;
  return page;
}
async function retry(f, n = 3) {
  let error;
  for (let i = 0; i < n; i++) {
    try {
      return await f();
    } catch (e) {
      error = e;
    }
  }
  throw error;
}

async function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}
function subStringCardNumber(cardNumber) {
  if (cardNumber.length < 16) {
    return null;
  }

  return [
    cardNumber.substring(0, 4),
    cardNumber.substring(4, 8),
    cardNumber.substring(8, 12),
    cardNumber.substring(12, 16)
  ];
}
const mapTextToSendLine = (text, { name, date, payMonth, price }) => {
  let newText = text;
  newText = newText.replace(new RegExp("{{name}}", "g"), name);
  newText = newText.replace(new RegExp("{{date}}", "g"), date);
  newText = newText.replace(new RegExp("{{price}}", "g"), price);
  newText = newText.replace(new RegExp("{{payMonth}}", "g"), payMonth);
  newText = newText.replace(new RegExp("<br/>", "g"), "\r\n");
  return newText;
};
module.exports = {
  getPage,
  retry,
  delay,
  subStringCardNumber,
  mapTextToSendLine
};
