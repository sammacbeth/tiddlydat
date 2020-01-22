<script>
  import createWiki from './create-wiki.js';
  let disabled = false;
  let error = false;
  let wikiUrl = '';
  let statusText = '';
  let progress = null;
  let title = '';

  async function submit() {
    disabled = !disabled;
    error = false;
    try {
      console.log('xxx', title);
      statusText = '';
      progress = -1;
      wikiUrl = await createWiki(title, (a, b) => {
        progress = Math.round(100*a/b);
      });
      try {
        localStorage.setItem('mywiki', wikiUrl);
      } catch (e) {}
    } catch (e) {
      error = true;
      statusText = 'Error creating :(';
      console.error(e);
    }
    disabled = false;
    progress = null;
  }
</script>

<div class="box">
  <h2 class="title">Create New</h2>
{#if wikiUrl === ''}
  <div class="field">
    <label class="label">Wiki Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="My TiddlyWiki" disabled="{disabled ? 'disabled' : ''}" bind:value={title}>
    </div>
  </div>
  {#if progress === -1}
    <progress class="progress is-small is-primary" 
      max="100">0%</progress>
  {:else if progress !== null}
    <progress class="progress is-small is-primary" 
      value={progress}
      max="100">{progress}%</progress>
  {/if}
  <div class="field has-addons">
  <button class="button is-link level" disabled="{disabled ? 'disabled' : ''}" on:click={submit}>
    Create New Wiki
  </button>
  {#if statusText}
    <span class="tag is-large {error ? 'is-danger' : 'is-primary'}">{statusText}</span>
  {/if}
  </div>
{:else}
  <button class="button is-link" on:click={() => document.location.href = wikiUrl}>
    Go to Wiki!
  </button>
{/if}
</div>
