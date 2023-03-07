<template>
  <Container>
    <form @submit="onSubmit">
      <div class="grid">
        <div>
          <span class="p-float-label">
            <InputNumber class="input" id="min" v-model="min" autofocus />
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

    <audio v-show="url.length" :src="url" controls class="audio" />
  </Container>
</template>

<script setup>
import { ref } from "vue";
import Container from "src/shared/ui/container.vue";
import { numbersApi } from "src/shared/api/numbers";

const min = ref(1);
const max = ref(100);
const url = ref("");

const base64ToBlob = (base64, type) => {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
};

const onSubmit = async (e) => {
  e.preventDefault();

  const res = await numbersApi.getAudio({ min: min.value, max: max.value });
  const blob = base64ToBlob(res.audio, "audio/mpeg");

  url.value = URL.createObjectURL(blob);
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

.audio {
  margin-top: 20px;
}
</style>
