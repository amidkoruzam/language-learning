export default defineEventHandler(async (event) => {
  const { min, max } = await readBody(event);

  return {
    min,
    max,
  };
});
