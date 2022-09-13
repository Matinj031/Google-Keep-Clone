<template>
  <div class="flexStyle">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#000"
      >
        <path
          d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"
        />
      </svg>
    </div>
    <p>Notes with upcoming reminders appear here</p>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.flexStyle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
svg {
  opacity: 0.1;
  background-size: cover;
  width: 120px;
  height: 120px;
}
p {
  padding-top: 1.7rem;
  opacity: 1 !important;
  color: #90918f;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
}
</style>