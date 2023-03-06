<template>
  <Container>
    <form @submit="onSubmit">
      <div class="grid">
        <div>
          <span class="p-float-label">
            <InputText class="input" id="min" v-model="min" />
            <label for="min">Min</label>
          </span>
        </div>

        <div>
          <span class="p-float-label">
            <InputNumber class="input" id="max" v-model="max" />
            <label for="max">Max</label>
          </span>
        </div>
      </div>

      <Button type="submit">Select</Button>
    </form>
  </Container>
</template>

<script setup>
import { ref } from "vue";
import Container from "src/shared/ui/container.vue";
import { numbersApi } from "src/shared/api/numbers";

const min = ref(0);
const max = ref(0);

const onSubmit = async (e) => {
  e.preventDefault();

  numbersApi
    .getAudio({ min: min.value, max: max.value })
    .then((data) => console.log(data));
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  margin-top: 50px;
  margin-bottom: 20px;
}

.input {
  width: 100%;
}
</style>
