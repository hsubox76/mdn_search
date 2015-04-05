function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'mdn: Search the Mozilla Developer Network Javascript Section for %s'
  });
}

resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  // Suggestion code will end up here.
  var suggestions = [];
  if (text.search('a') > -1) {
    suggestions.push({ content: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', description: 'Array Methods'});
    suggest(suggestions);
  }
  if (text.search('s') > -1) {
    suggestions.push({ content: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String', description: 'String Methods'});
    suggest(suggestions);
  }
});

chrome.omnibox.onInputEntered.addListener(function (text) {
});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
    if (text.slice(0,5) === "https") {
      navigate(text);
    } else {
      navigate("https://developer.mozilla.org/en-US/search?topic=js&q=" + text);
    }
});