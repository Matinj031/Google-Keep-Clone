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
          d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
        />
        <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
      </svg>
    </div>
    <p>No notes in Trash</p>
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