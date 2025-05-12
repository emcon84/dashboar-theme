import { useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { PiCheckFatFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface AdvancedTableProps {
  data: Record<string, string | number>[];
  itemsPerPage?: number;
  enableSearch?: boolean;
  enableColumnConfig?: boolean;
  editable?: boolean;
  onEdit?: (row: Record<string, string>) => void;
  onDelete?: (id: number) => void;
}

export const AdvancedTable = ({
  data,
  itemsPerPage = 5,
  enableSearch,
  enableColumnConfig,
  editable = true,
  onEdit,
  onDelete,
}: AdvancedTableProps) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const cols: Record<string, boolean> = {};
    Object.keys(data[0] || {}).forEach((k) => {
      if (k !== "id") cols[k] = true;
    });
    return cols;
  });
  const [showColumnsModal, setShowColumnsModal] = useState(false);

  const [editFormData, setEditFormData] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    if (!enableSearch || !search) return data;
    return data.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, enableSearch]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleEditClick = (row: Record<string, string | number>) => {
    const formData: Record<string, string> = {};
    Object.keys(row).forEach((key) => {
      if (key !== "id") formData[key] = String(row[key]);
    });
    setEditFormData(formData);
    setEditingId(Number(row.id));
  };

  const handleSave = (id: number) => {
    toast.success("Edit saved");
    setEditingId(null);
    onEdit?.({ id: String(id), ...editFormData });
  };

  const handleDelete = (id: number) => {
    toast.success("Item deleted");
    onDelete?.(id);
  };

  console.log(enableColumnConfig);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        {enableSearch && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="p-2 rounded w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
        )}
        {enableColumnConfig && (
          <button
            onClick={() => setShowColumnsModal(true)}
            className="ml-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded w-[300px]"
          >
            Configure Columns
          </button>
        )}
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            {Object.keys(visibleColumns).map(
              (key) =>
                visibleColumns[key] && (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="cursor-pointer py-2 px-4 border-b text-gray-600 dark:text-gray-200 capitalize"
                  >
                    {key}
                    {sortConfig?.key === key &&
                      (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                  </th>
                )
            )}
            <th className="py-2 px-4 border-b text-gray-600 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <AnimatePresence mode="wait">
          <motion.tbody
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 text-white"
              >
                {Object.keys(visibleColumns).map(
                  (key) =>
                    visibleColumns[key] && (
                      <td
                        key={key}
                        className="py-2 px-4 border-b text-gray-600 dark:text-gray-200"
                      >
                        {editingId === row.id ? (
                          <input
                            type="text"
                            value={editFormData[key] || ""}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full p-1 rounded bg-gray-50 dark:bg-gray-700"
                          />
                        ) : (
                          row[key]
                        )}
                      </td>
                    )
                )}
                <td className="py-2 px-4 border-b space-x-2">
                  {editable && editingId === row.id ? (
                    <>
                      <button
                        onClick={() => handleSave(row.id as number)}
                        className="text-green-500"
                      >
                        <PiCheckFatFill size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-red-500"
                      >
                        <MdCancel size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      {editable && (
                        <button
                          onClick={() => handleEditClick(row)}
                          className="text-blue-500"
                        >
                          <FaEdit size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(row.id as number)}
                        className="text-red-500"
                      >
                        <FaTrash size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </motion.tbody>
        </AnimatePresence>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Configure Columns Modal */}
      {enableColumnConfig && showColumnsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Configure Columns
            </h2>
            <div className="space-y-2">
              {Object.keys(visibleColumns).map((key) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleColumns[key]}
                    onChange={() =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    className="text-blue-500"
                  />
                  <span className="capitalize text-gray-700 dark:text-gray-200">
                    {key}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowColumnsModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
