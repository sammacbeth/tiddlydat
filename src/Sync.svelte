<script>
  import { getDatInfo, getTiddlerDiff } from './sync-wiki.js';
  import DiffList from './DiffList.svelte';

  let dest = localStorage.getItem('mywiki') || '';
  let destOk = null;
  let src = localStorage.getItem('syncsrc') || '';
  let srcOk = null;
  $: {
    getDatInfo(dest).then((res) => {
      destOk = res && res.isOwner && res.isWiki;
      if (destOk) {
        localStorage.setItem('mywiki', dest);
      }
    });
    getDatInfo(src).then((res) => {
      srcOk = res && res.isWiki;
      if (srcOk) {
        localStorage.setItem('syncsrc', src);
      }
    });
  }

  let showTable = false;
  let progress = null;
  let rows = null;

  function loadDiff() {
    showTable = true;
    progress = null;
    rows = null;
    getTiddlerDiff(src, dest, (a, b) => {
      progress = Math.round(100*a/b);
      console.log('progress', progress, a, b);
    }).then((res) => {
      console.log('xxx', res);
      rows = res;
    })
  }
</script>

<div class="box">
  <h2 class="title">Sync tiddlers from another wiki</h2>
  <div class="field">
    <label class="label">Your wiki:</label>
    <div class="control">
      <input
        class="input {destOk ? 'is-success': ''} {destOk === false ? 'is-danger': ''}" 
        type="text" 
        placeholder="dat://..."
        bind:value={dest}>
      {#if destOk}
        <p class="help is-success">Archive is writeable!</p>
      {:else if destOk === false}
        <p class="help is-danger">Archive is not writeable or not a wiki!</p>
      {/if}
    </div>
  </div>
  <div class="field">
    <label class="label">Sync tiddlers from:</label>
    <div class="control">
      <input class="input {srcOk ? 'is-success': ''} {srcOk === false ? 'is-danger': ''}"
        type="text"
        placeholder="dat://..."
        bind:value={src}
      >
      {#if srcOk}
        <p class="help is-success">That's a wiki!</p>
      {:else if srcOk === false}
        <p class="help is-danger">Doesn't look like a wiki</p>
      {/if}
    </div>
  </div>
  {#if destOk && srcOk}
    <button class="button" on:click={loadDiff}>Load Diff</button>
    {#if showTable}
      <DiffList src={src} dest={dest} progress={progress} rows={rows} />
    {/if}
  {/if}
</div>
