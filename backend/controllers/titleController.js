function processTitle(titleInput) {
  const separatedTitle = titleInput.split('+');
  const title = separatedTitle[0].trim();
  let grinder = '';
  let kit = '';

  separatedTitle.forEach((data) => {
    if (data && data.includes('csomag')) {
      kit = removeDiscountTag(data).trim();
    }
    if (data && data.includes('őrlő')) {
      grinder = removeDiscountTag(data).trim();
    }
  });
  return { title, grinder, kit };
}

function removeDiscountTag(title) {
  return title.replace('-Akció!', '');
}

module.exports = { processTitle };
