<template>
  <Container>
    <form class="form" @submit="onSubmit">
      <div class="p-float-label">
        <InputText id="key-words" v-model="keyWords" class="input" />
        <label for="key-words">Key words</label>
      </div>

      <Button class="generate-button" type="submit">Generate</Button>
    </form>

    <template v-if="loading">
      <ProgressSpinner />
    </template>
    <template v-else>
      <div class="generated-content-container" v-show="audio.length">
        <audio :src="audio" controls class="audio" />
        <div class="text">
          <p>{{ text }}</p>
        </div>
      </div>
    </template>
  </Container>
</template>

<script setup>
import Container from "src/shared/ui/container.vue";
import { ref } from "vue";
import { textApi } from "src/shared/api/text";

const keyWords = ref("");
const text = ref("");
const audio = ref("");
const loading = ref(false);

const base64ToBlob = (base64, type) => {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
};

const onSubmit = (e) => {
  e.preventDefault();

  loading.value = true;

  textApi.getText({ keyWords: keyWords.value }).then((response) => {
    loading.value = false;

    text.value = response.text;
    audio.value = URL.createObjectURL(
      base64ToBlob(response.audio, "audio/mpeg")
    );
  });
};
</script>

<style scoped>
.form {
  margin-top: 50px;
}

.input {
  width: 100%;
}

.generate-button {
  margin-top: 20px;
}

.generated-content-container {
  margin-top: 50px;
}

.text {
  margin-top: 20px;
}
</style>