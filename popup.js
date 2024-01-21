document.addEventListener('keydown', (e) => {
  // console.log(`Key pressed ${e.key} \r\n Key code value: ${e.code}`);
  if (e.ctrlKey && e.code == "KeyS") {
    e.preventDefault()
    // console.log("CTRL+S")
    a.click()
  }
}, false);

let email = 'contact@youremail.com'


function updateMailto() {
  try {
    mailto.href = `mailto:${email}?subject=notes&body=` +
      encodeURIComponent(contenteditable.innerText)
  } catch (error) {
    alert(JSON.stringify(error))
  }
}
function updateDownloadLink(text, name, type) {
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
}
const load = function () {
  clearall.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear content and email?")) {
      localStorage.clear()
      location.reload()
    }
  })
  email = localStorage.getItem("email") || email
  emailinput.value = email
  emailinput.addEventListener('input', () => {
    localStorage.setItem("email", emailinput.value)
    updateMailto()
  })
  updateMailto()
  contenteditable.innerText = localStorage.getItem("content") ||
    `Keeping your notes safe and private is easy. 
  This page saves your notes in local storage. It doesn't have any tracking script. 
  You can easily audit this page it has less than 100 lines of code. Just right click and inspect.`
  save()
  contenteditable.addEventListener('input', save)
  // Set focus to the end of the contenteditable
  var range = document.createRange();
  var selection = window.getSelection();
  range.selectNodeContents(contenteditable);
  range.collapse(false); // false means collapse to end.
  selection.removeAllRanges();
  selection.addRange(range);
  contenteditable.focus();

};
const save = function () {
  var content = contenteditable.innerText;
  localStorage.setItem('content', content);
  updateDownloadLink(contenteditable.innerText, `notes-${new Date().toISOString()}.txt`, 'text')
  updateMailto()
};

load()

