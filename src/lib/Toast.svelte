<script>
  export let message = '';
</script>

{#if message}
  <div class="toast">{message}</div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    z-index: 100;
  }
</style>
