<script setup lang="ts">
  type Props = {
    height?: number
  }

  const { height = 553 } = defineProps<Props>()
</script>

<template>
  <svg :height viewBox="0 0 664 553" fill="none" xmlns="http://www.w3.org/2000/svg" vector-effect="non-scaling-stroke">
    <rect x="232.5" y="56.5" width="199" height="136.178" rx="7.5" stroke="var(--color-ghost-200)" stroke-miterlimit="2.28117" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="314" y="75.6329" vector-effect="non-scaling-stroke">User</tspan>
    </text>
    <line x1="232.297" y1="83.4987" x2="431.703" y2="83.4987" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="239.301" y="104.001" vector-effect="non-scaling-stroke">username: string</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="239.301" y="125.366" vector-effect="non-scaling-stroke">email: string</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="239.301" y="159.214" vector-effect="non-scaling-stroke">login()</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="239.301" y="180.579" vector-effect="non-scaling-stroke">logout()</tspan>
    </text>
    <line x1="232.296" y1="135.656" x2="431.701" y2="135.223" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <rect x="85.8007" y="337.5" width="199" height="117.816" rx="7.5" stroke="var(--color-ghost-200)" stroke-miterlimit="2.28117" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="161.301" y="356.633" vector-effect="non-scaling-stroke">Admin</tspan>
    </text>
    <line x1="85.598" y1="364.499" x2="285.003" y2="364.499" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="92.6013" y="385.001" vector-effect="non-scaling-stroke">accessLevel: number</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="92.6013" y="418.037" vector-effect="non-scaling-stroke">banUser(user: User)</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="92.6013" y="441.721" vector-effect="non-scaling-stroke">generateReport()</tspan>
    </text>
    <line x1="85.2996" y1="394.664" x2="284.704" y2="394.231" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <path
      d="M285.003 194.178L280.56 197.864L285.974 199.869L285.003 194.178ZM232.11 337L232.579 337.174L283.909 198.572L283.44 198.398L282.971 198.224L231.641 336.826L232.11 337Z"
      fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <rect x="381.5" y="337.5" width="199" height="90" rx="7.5" stroke="var(--color-ghost-200)" stroke-miterlimit="2.28117" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="458.5" y="356.633" vector-effect="non-scaling-stroke">Guest</tspan>
    </text>
    <line x1="381.297" y1="364.499" x2="580.703" y2="364.499" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="388.301" y="385.001" vector-effect="non-scaling-stroke">expiresAt: Date</tspan>
    </text>
    <text fill="var(--color-ghost-200)" xml:space="preserve" style="white-space: pre" font-family="Rajdhani" font-size="16" vector-effect="non-scaling-stroke"
      letter-spacing="0em">
      <tspan x="388.301" y="416.53" vector-effect="non-scaling-stroke">requestAccess()</tspan>
    </text>
    <line x1="380.999" y1="394.664" x2="580.404" y2="394.231" stroke="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
    <path
      d="M381 193.733L379.763 199.373L385.265 197.624L381 193.733ZM426.77 337.77L427.246 337.618L382.839 197.871L382.363 198.022L381.886 198.174L426.293 337.921L426.77 337.77Z"
      fill="var(--color-ghost-200)" vector-effect="non-scaling-stroke" />
  </svg>
</template>

<style scoped></style>
