import { Toast } from "../components/Toast";

const ToastPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      <div className="space-y-4">
        <button
          onClick={() => Toast.success("¡Guardado con éxito!")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-3"
        >
          Mostrar Toast Success
        </button>

        <button
          onClick={() => Toast.error("Ocurrió un error inesperado")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mx-3"
        >
          Mostrar Toast Error
        </button>

        <button
          onClick={() => Toast.info("Recordá revisar los datos")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mx-3"
        >
          Mostrar Toast Info
        </button>
      </div>
    </div>
  );
};

export default ToastPage;
