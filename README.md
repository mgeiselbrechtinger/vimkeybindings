# Firefox extension with a few vim keybindings.

* [Source on Github](https://github.com/autonome/vimkeybindings)

## Supported Commands

* h     : scroll left
* j     : scroll down
* k     : scroll up
* l     : scroll right
* u     : (undo) go back one page
* gg    : go to the top of the page
* GG    : go to the bottom of the page
* gt    : go to the next tab
* gT    : go to the previous tab
* {n}gt : go to the n-th tab
* :q    : close current tab
* :Fi   : open new tab at position n+1

Commands can be repeated as in vim. Example: 50j will scroll down 50 lines.
Also inputs can be aborted using the escape key (or any other non-command key).

## Credits

* Originally by the author of [this O'Reilly post](http://www.oreillynet.com/linux/blog/2006/04/firefox_with_vim_keybindings.html)
* Packaged by Arno, a commenter there
* Updated and repackaged by me on AMO
* Documented by Christopher Svec
* Rewritten from scratch with the WebExtensions API for Firefox 53 and after (and a few before) by Dietrich Ayala (https://github.com/autonome/vimkeybindings)
* Adopted by me

## Issues

* Event listener doesn't work on blank tabs or pdf-viewer

