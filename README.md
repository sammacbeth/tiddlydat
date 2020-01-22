# TiddlyDat

This is a webapp that allows you to create editable wikis in the browser using [TiddlyWiki](https://tiddlywiki.com/) and [Dat](https://dat.foundation/). You will need a dat-compatible browser, e.g. [Beaker Browser](https://beakerbrowser.com/), [Cliqz (support coming soon)](https://cliqz.com/en/download) or in Firefox with [dat-fox](https://addons.mozilla.org/en-US/firefox/addon/dat-p2p-protocol/).

The app can be visited at [dat://tiddlywiki.hashbase.io/](dat://tiddlywiki.hashbase.io/).

## Usage

 1. Load [dat://tiddlywiki.hashbase.io/](dat://tiddlywiki.hashbase.io/) in your browser.
 2. Choose a wiki name and create your wiki.
 3. Once created you have a personal dat URL for your wiki. Any changes you make are automatically saved locally. You can also access it in read-only mode from any other dat browser.

### Syncing

If you end up wikis on several devices, or you want to collaborate with others on wiki content, you can _sync_ wiki pages with other wikis:
 1. Load [dat://tiddlywiki.hashbase.io/](dat://tiddlywiki.hashbase.io/) in your browser.
 2. In the 'Sync Tiddlers' section, put in the dat URL of your wiki, and that of the wiki you want to pull pages from.
 3. If the addresses are valid, you should see a 'Load Diff' button, click it.
 4. You will see a list of pages from the other wiki that are different to yours. You can choose which ones you want to import.
 5. The next time you open your wiki, the new pages will be available to read and modify!

## License

TiddlyWiki (which is bundled with this repo) is licensed under the terms stated in the [TiddlyWiki License](./public/dist/TiddlyWiki License) file.

The rest of the code here is license under the [Unlicense](https://choosealicense.com/licenses/unlicense/).
