(async function() {
    try {
        console.log('[dat wiki] start loader');
        const a = new DatArchive(document.location.href);
        let content = ''
        content += await a.readFile('blocks/static.html');
        content += await a.readFile('blocks/noscript.html');
        const tiddlers = await a.readdir('tiddlers/');
        const tidtexts = tiddlers.map((name) => {
            return a.readFile('tiddlers/' + name);
        })
        const tidhtml = (await Promise.all(tidtexts)).join('');
        content += '<div id="storeArea" style="display:none">' + tidhtml + '</div>';
        content += await a.readFile('blocks/modules.html');
        content += await a.readFile('blocks/kernel_prologue.html');
        content += await a.readFile('blocks/kernel.html');
        document.write(content);
        document.close();
    } catch (e) {
        console.error(e);
    }
})()