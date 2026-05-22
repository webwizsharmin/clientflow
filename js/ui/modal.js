export function initClientModal() {
  const modal = document.getElementById("clientModal");
  const openBtn = document.querySelector(".btn-new-client");
  const closeBtn = document.getElementById("closeClientModal");
  const cancelBtn = document.getElementById("cancelClientModal");

  function openModal() {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove(overflow - hidden);
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);
}
