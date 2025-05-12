import { AdvancedTable } from "../components/AdvancedTable";

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Carlos Pérez", email: "carlos@example.com", role: "User" },
  { id: 4, name: "Ana Gómez", email: "ana@example.com", role: "Admin" },
  { id: 5, name: "Laura Díaz", email: "laura@example.com", role: "Editor" },
];

const ExamplePage = () => {
  const handleEdit = (updatedRow: Record<string, string>) => {
    console.log("Edited row:", updatedRow);
    // Podés actualizar estado externo, enviar al backend, etc.
  };

  const handleDelete = (id: number) => {
    console.log("Deleted row ID:", id);
    // Podés eliminar del backend o actualizar la store
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Usuarios
      </h1>

      <AdvancedTable
        data={mockData}
        itemsPerPage={3}
        enableSearch
        enableColumnConfig
        editable
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ExamplePage;
