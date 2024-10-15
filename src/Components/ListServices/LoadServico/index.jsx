import { MutatingDots } from "react-loader-spinner";

export const LoadServico = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center h-loader">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#6d6d6d"
              secondaryColor="#6d6d6d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
