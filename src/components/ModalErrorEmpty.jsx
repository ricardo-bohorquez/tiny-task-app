export function displayErrorModal(prop) {
  document.getElementById(`modal-error`).style.display = prop;
}

export function ModalErrorEmpty() {
  return (
    <section
      className="modal-body"
      id="modal-error"
      style={{ display: "none" }}
    >
      <div className="modal-content">
        <h4>No puede crear tareas con títulos ni descripciones vacías</h4>
        <button onClick={() => displayErrorModal("none")} id="acceptError">
          Aceptar
        </button>
      </div>
    </section>
  );
}
