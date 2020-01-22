
const cuts = [
    ['header', ''],
    ['header_markup', '<!--~~ This is a Tiddlywiki file. The points of interest in the file are marked with this pattern ~~-->'],
    ['static', '<!--~~ Static styles ~~-->'],
    ['noscript', '<!--~~ Static content for Google and browsers without JavaScript ~~-->'],
    ['tiddlers', '<!--~~ Ordinary tiddlers ~~-->'],
    ['modules', '<!--~~ Library modules ~~-->'],
    ['kernel_prologue', '<!--~~ Boot kernel prologue ~~-->'],
    ['kernel', '<!--~~ Boot kernel ~~-->'],
    ['footer', '<!--~~ Raw markup for the bottom of the body section ~~-->'],
]

export default async function createWiki(title, progressCallback) {
    const self = new DatArchive(document.location.href);
    const wikiCode = await self.readFile('dist/index.html', { encoding: 'utf-8', timeout: 30000 });
    const startupScript = await self.readFile('dist/dat-startup.js', { encoding: 'utf-8', timeout: 30000 });
    const parts = {}
    // split wiki text into chunks
    cuts.forEach(([name, str], i) => {
        const start = wikiCode.indexOf(str);
        const stop = i < cuts.length - 1 ? wikiCode.indexOf(cuts[i+1][1]) : undefined;
        const section = wikiCode.slice(start, stop);
        parts[name] = {
            text: section,
            length: section.length,
        }
    });

    const loader = '<script type="application/javascript" src="./dat-startup.js"></script>'
    const indexFile = [parts.header.text, parts.header_markup.text, loader, parts.footer.text].join('');
    // process tiddlers
    const tiddlers = document.createElement('template');
    tiddlers.innerHTML = parts.tiddlers.text.trim();

    const archive = await DatArchive.create({
        title,
        description: '',
        type: ['wiki', 'tiddlywiki'],
    })
    console.log('xxx archive', archive.url);

    const filesToWrite = [
        ['index.html', indexFile],
        ['dat-startup.js', startupScript],
        ['blocks/static.html', parts.static.text],
        ['blocks/noscript.html', parts.noscript.text],
        ['blocks/modules.html', parts.modules.text],
        ['blocks/kernel_prologue.html', parts.kernel_prologue.text],
        ['blocks/kernel.html', parts.kernel.text],
    ]
    tiddlers.content.querySelectorAll('#storeArea>div').forEach((node) => {
        const title = node.getAttribute('title').replace(/[\/;\$]/g, '_');
        filesToWrite.push([`tiddlers/${title}.html`, node.outerHTML]);
    });

    await archive.mkdir('blocks');
    await archive.mkdir('tiddlers');

    const totalFiles = filesToWrite.length;
    let i = 0;
    for (const [path, contents] of filesToWrite) {
        i += 1;
        progressCallback(i, totalFiles);
        await archive.writeFile(path, contents);
    }
    // window.open(archive.url);
    return archive.url;
}