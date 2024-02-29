<script lang="ts">
  let connected = $state(false);
  const socket = new WebSocket("ws://isk04w8.128.199.5.88.sslip.io");

  // Just to toggle the red green status emoji
  socket?.addEventListener("open", () => (connected = true));
  socket?.addEventListener("close", () => (connected = false));
</script>

<p>
  System status: {connected
    ? "🟢 ONLINE"
    : "🔴 HOUSTON WE HAVE A PROBLEM (or it's just still loading, give it a sec would ya!)"}
</p>
