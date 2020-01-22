<script>
  import Create from './Create.svelte';
  import Sync from './Sync.svelte';
</script>

<div class="section">
  <div class="container is-fluid">
      <h1 class="title">
        TiddlyDat
      </h1>
      <p class="subtitle">
        A personal Wiki with <a href="https://tiddlywiki.com/">TiddlyWiki</a> and <a href="https://dat.foundation/">Dat</a>
      </p>
	  <Create />
  </div>
</div>
<div class="section">
  <div class="container is-fluid">
    <Sync />
  </div>
</div>
