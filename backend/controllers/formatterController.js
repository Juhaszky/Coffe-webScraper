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
      console.log('van örlő:', data);
      grinder = removeDiscountTag(data).trim();
    }
  });
  return { title, grinder, kit };
}

function processItemNumber(numberInput) {
  let itemNumber = '';
  if (numberInput && numberInput.includes('Cikkszám:')) {
    itemNumber = numberInput.replace('Cikkszám:', '').trim();
  }
  return itemNumber;
}

function removeDiscountTag(title) {
  if (title && title.includes('-Akció!')) {
    title = title.replace('-Akció!', '');
  }
  return title;
}

module.exports = { processTitle, processItemNumber };
