import { Outlet } from "react-router-dom";

export const LayoutPadraoFormularios = () => {
    return (
        <>
        <div className="background-foto">
            <div className="background-transparente">
                <div className="container-fluid">
                    <div className="row tela-toda">
                        <div className="col-12">
                            <Outlet/>                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}