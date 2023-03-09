const getText = ({ keyWords }: { keyWords: string }) =>
  fetch("/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyWords,
    }),
  }).then((res) => res.json());

export const textApi = {
  getText,
};
