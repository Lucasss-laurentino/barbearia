export const SpanAdd = ({ handleShow, barbeiros }) => {
  return (
    <>
      <span
        className="adc-barbeiro d-flex justify-content-end align-items-end flex-column"
        onClick={() => handleShow()}
      >
        {barbeiros.length < 1 && (
          <div className="balloon">
            <p className="msg-balloon">Cadastre um Barbeiro aqui !</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#fff"
              class="bi bi-caret-down-fill position-get-on-balloon"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="#fff"
          className="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </span>
    </>
  );
};
