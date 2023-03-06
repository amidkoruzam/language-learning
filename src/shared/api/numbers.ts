export const getAudio = ({ min, max }: { min: number; max: number }) =>
  fetch("/api/numbers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      min,
      max,
    }),
  }).then((res) => res.json());

export const numbersApi = {
  getAudio,
};
