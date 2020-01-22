

export function validateDatAddress(address) {
  try {
    return new DatArchive(address);
  } catch (e) {
    return false;
  }
}

export async function getDatInfo(address) {
  const archive = validateDatAddress(address);
  if (!archive) {
    return null;
  }
  const info = await archive.getInfo();
  let hasTiddlers = false;
  try {
    const stat = await archive.stat('/tiddlers/');
    hasTiddlers = stat.isDirectory()
  } catch (e) {}
  return {
    title: info.title,
    isOwner: info.isOwner,
    isWiki: hasTiddlers || !!(info.type && info.type.indexOf('tiddlywiki') !== -1),
  }
}

export async function getTiddlerDiff(srcUrl, destUrl, progressCallback) {
  const src = new DatArchive(srcUrl);
  const dest = new DatArchive(destUrl);

  // await src.download('/tiddlers/');
  const srcTiddlers = (await src.readdir('/tiddlers/', { timeout: 30000 }))
    .filter((name) => !name.startsWith('_'));
  const results = [];
  for (const name of srcTiddlers) {
    console.log(name);
    progressCallback(results.length, srcTiddlers.length);
    const tiddler = document.createElement('template');
    tiddler.innerHTML = await src.readFile(`/tiddlers/${name}`, { timeout: 30000 })
    console.log('xxx', tiddler);
    const tiddlerDiv = tiddler.content.firstChild;
    const info = {
      name,
      title: tiddlerDiv.getAttribute('title'),
      mtime: tiddlerDiv.getAttribute('modified'),
      ctime: tiddlerDiv.getAttribute('created'),
    };
    try {
      const existing = document.createElement('template');
      existing.innerHTML = await dest.readFile(`/tiddlers/${name}`)
      const existingDiv = existing.content.firstChild;
      info.exists = true;
      info.curmtime = existingDiv.getAttribute('modified');
      info.curctime = existingDiv.getAttribute('created');
    } catch (e) {
      info.exists = false;
    }
    results.push(info);
  }
  console.log('all tiddlers', results);
  return results.filter((info) => {
    if (info.exists && info.ctime === info.curctime && info.mtime === info.curmtime) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (a.mtime > b.mtime) {
      return -1;
    } else if (a.mtime < b.mtime) {
      return 1;
    }
    return 0;
  });
}

export async function importTiddler(srcUrl, destUrl, name) {
  const src = new DatArchive(srcUrl);
  const dest = new DatArchive(destUrl);
  const path = `/tiddlers/${name}`;
  const tiddler = await src.readFile(path);
  await dest.writeFile(path, tiddler);
}