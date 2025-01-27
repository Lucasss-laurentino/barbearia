import "./index.css";
import { FormPagamento } from "../FormPagamento";

export const MudarPagamento = () => {
  return (
    <>
      <div className="roll-pagamento col-12">
        <FormPagamento mudarPagamento={1} />
      </div>
    </>
  );
};
