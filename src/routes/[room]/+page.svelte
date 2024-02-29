<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const size = tweened(1, {
    duration: 300,
    easing: cubicOut,
  });
  import { page } from "$app/stores";
  import { get_a_room } from "$lib/all_stores.svelte";
  const a_room = get_a_room($page.params.room);

  $effect(() => {
    size.set(parseFloat(a_room.level));
  });

  function oninput(e) {
    a_room.set(e.target.value);
  }
</script>

<svelte:head>
  <title>Currently serving - {$page.params.room}</title>
</svelte:head>

<div style="transform: translateY({100 - $size}%); transform-origin: 0 0" />

{a_room.level}

{#if $page.url.searchParams.get("driver")}
  <input
    type="range"
    value={a_room.level}
    {oninput}
    id="slider"
    min="1"
    max="100"
  />
{/if}

<style>
  div {
    width: 100%;
    height: 100%;
    inset: 0;
    background: red;
    position: fixed;
    bottom: 0;
    z-index: -1;
  }
</style>
