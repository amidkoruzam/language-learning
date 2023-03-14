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

    <template v-if="isLoading">
      <div class="p-d-flex p-jc-center">
        <ProgressSpinner />
      </div>
    </template>

    <template v-else>
      <audio v-show="url.length" :src="url" controls class="audio" />

      <div v-show="url.length" class="answer">
        <form @submit.prevent="onAnswerSubmit">
          <span class="p-float-label">
            <InputNumber
              class="input"
              id="answer"
              v-model="userAnswer"
              @keydown.enter="onAnswerSubmit"
            />
            <label for="answer">Answer</label>
          </span>

          <Button class="answer-button" type="submit">Submit</Button>
        </form>
      </div>
    </template>
  </Container>

  <Toast />
</template>

<script setup>
import { ref } from "vue";
import Container from "src/shared/ui/container.vue";
import { numbersApi } from "src/shared/api/numbers";
import { useToast } from "primevue/usetoast";

const min = ref(1);
const max = ref(100);
const url = ref("");
const userAnswer = ref(0);
const correctAnswer = ref(0);
const isLoading = ref(false);

const toast = useToast();

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

  isLoading.value = true;

  const res = await numbersApi.getAudio({ min: min.value, max: max.value });
  const blob = base64ToBlob(res.audio, "audio/mpeg");

  correctAnswer.value = res.number;

  url.value = URL.createObjectURL(blob);

  isLoading.value = false;
};

const onAnswerSubmit = (e) => {
  e.preventDefault();

  const toastLifetimeInMs = 3000;

  if (correctAnswer.value === userAnswer.value) {
    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Correct",
      life: toastLifetimeInMs,
    });

    url.value = "";
    userAnswer.value = 0;
  } else {
    toast.add({
      severity: "error",
      summary: "Info",
      detail: "Incorrect",
      life: toastLifetimeInMs,
    });
  }
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
  width: 100%;
  margin-top: 20px;
}

.answer {
  margin-top: 20px;
}

.answer-button {
  margin-top: 20px;
}
</style>
