export async function loadClientModal() {
  const response = await fetch("./js/components/clientModal.html");

  const html = await response.text();
  document.body.insertAdjacentElement("beforeend", html);
}
