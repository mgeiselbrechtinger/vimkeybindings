/**
 * Handles tab interaction
 * @param {object} currentTab The tab (content-script) which ran the action. 
 * {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab|tabs.Tab} object. 
 * @param {string} commandRepetition {i}g(t/T). The i is command repetition. 
 * @param {string} direction next/prev
 */
async function controlTabs(currentTab, commandRepetition, direction) {
  try {
    const { id, index, windowId } = currentTab;
    const tabs = await browser.tabs.query({ windowId, hidden: false });
    const tabCount = tabs.length;
    let tabIndex = null;

    switch (direction) {

      case "next":
        //If no repetition, then we just want to navigate to the next tab
        if (commandRepetition == "") {
          tabIndex = (index + 1) % tabCount;
        } else if (commandRepetition == "0") {
          //Some dev-minded person tried to navigate 0gt :)
          tabIndex = 0;
        } else if (+commandRepetition <= tabCount) {
          //This is a special case: 5gt means "go to the 5th tab"
          //@see {@link http://vim.wikia.com/wiki/Using_tab_pages|Using tab pages} Navigation section
          //Since the tab index is zero-based, subtract 1 from the desired index.
          tabIndex = +commandRepetition - 1;
        }
        await browser.tabs.update(tabs[tabIndex].id, { active: true });
        break;

      case "prev":
        tabIndex = index - 1;
        if (tabIndex < 0) 
                tabIndex = tabCount - 1;
        await browser.tabs.update(tabs[tabIndex].id, { active: true });
        break;

      case "new":
        await browser.tabs.create({ index: (index + 1)});
        break;

      case "close":
        await browser.tabs.remove(id);
        break;

      default:
        break;
    }

  } catch (ex) {
    console.log("Something went wrong.");
    console.log(ex.message);
  }
}

//Listen the messages sent by the content-script.js
browser.runtime.onMessage.addListener((request, sender) => {
  const { command, repetition } = request.message;

  switch (command) {
    case "activateNextTab":
      controlTabs(sender.tab, repetition, "next");
      break;
  
    case "activatePreviousTab":
      controlTabs(sender.tab, 0, "prev");
      break;
  
    case "activateNewTab":
      controlTabs(sender.tab, 0, "new");
      break;

    case "closeCurrentTab":
      controlTabs(sender.tab, 0, "close");
      break;

    default:
      break;
  }
});
