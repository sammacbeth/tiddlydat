<script>
  import { importTiddler } from './sync-wiki.js';
  export let src;
  export let dest;
  export let rows;
  export let progress;
  let highlight = [];

  async function onImport(name) {
    await importTiddler(src, dest, name);
    highlight = [...highlight, name];
    console.log('xxx', highlight, name);
  }
</script>

{#if rows === null}
  {#if progress !== null}
    <progress class="progress is-small is-primary" 
      value={progress}
      max="100">{progress}%</progress>
  {:else}
    <progress class="progress is-small is-primary" 
      max="100">0%</progress>
  {/if}
{:else}
<table class="table">
  <thead>
    <tr>
      <th>Page title</th>
      <th>Modified</th>
      <th>Diff</th>
      <th>Import?</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
    <tr class="{ highlight.indexOf(row.name) !== -1 ? 'is-selected': ''}">
      <td>{row.title}</td>
      <td>{row.mtime}</td>
      <td>
        {#if row.exists}
          {#if row.mtime > row.curmtime}
            <span class="tag is-warning">theirs is newer</span>
          {:else if row.mtime < row.curmtime}
            <span class="tag is-danger">theirs is older</span>
          {:else}
            <span class="tag is-primary">theirs is the same</span>
          {/if}
        {:else}
          <span class="tag is-success">no conflict</span>
        {/if}
      </td>
      <td><button class="button is-small" on:click={() => onImport(row.name)}>import</button></td>
    </tr>
    {/each}
  </tbody>
</table>
{/if}