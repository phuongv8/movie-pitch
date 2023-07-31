export const setTextContent = (elementId, text) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
};

export const setInnerHTML = (elementId, html) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
};
