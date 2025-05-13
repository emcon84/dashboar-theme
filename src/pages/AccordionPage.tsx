import { Accordion } from "../components/Accordion";

const items = [
  {
    title: "Texto simple",
    content: "Esto es un párrafo plano.",
  },
  {
    title: "Contenido con botón",
    content: (
      <div className="space-y-2">
        <p>Este panel tiene contenido más complejo.</p>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          Acción interna
        </button>
      </div>
    ),
  },
  {
    title: "Formulario dentro del acordeón",
    content: (
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Enviar
        </button>
      </form>
    ),
  },
];

const AccordionPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10">
      <Accordion items={items} singleOpen />
    </div>
  );
};

export default AccordionPage;
