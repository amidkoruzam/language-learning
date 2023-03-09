<template>
  <Container>
    <form class="form" @submit="onSubmit">
      <div class="p-float-label">
        <InputText id="key-words" v-model="keyWords" class="input" />
        <label for="key-words">Key words</label>
      </div>

      <Button class="generate-button" type="submit">Generate</Button>
    </form>
  </Container>
</template>

<script setup>
import Container from "src/shared/ui/container.vue";
import { ref } from "vue";
import { textApi } from "src/shared/api/text";

const keyWords = ref("");
const text = ref("");

const onSubmit = (e) => {
  e.preventDefault();

  textApi.getText({ keyWords: keyWords.value }).then((response) => {
    console.log(response);

    text.value = response.text;
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
</style>