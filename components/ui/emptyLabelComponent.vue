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
          d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"
        />
      </svg>
    </div>
    <p>No notes with this label yet</p>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.flexStyle {
 width: 100vw;
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