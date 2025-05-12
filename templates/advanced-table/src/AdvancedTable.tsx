import React, { useState, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiCheckFatFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type DataRow = Record<string, string | number>;

// 💥 Mock data (podés agregar o quitar campos libremente)
const mockData: DataRow[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "User",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Admin",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "User",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
  },
];

const AdvancedTable = () => {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof mockData)[0];
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔥 Generamos dinámicamente las columnas iniciales
  const initialColumns = Object.keys(mockData[0]).reduce(
    (acc, key) => {
      if (key !== "id") acc[key] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

  const [visibleColumns, setVisibleColumns] = useState(initialColumns);
  const [showColumnsModal, setShowColumnsModal] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 💥 Formulario dinámico para edición
  const [editFormData, setEditFormData] = useState(
    Object.keys(mockData[0]).reduce(
      (acc, key) => {
        if (key !== "id") acc[key] = "";
        return acc;
      },
      {} as Record<string, string>
    )
  );

  const handleEditClick = (item: DataRow) => {
    const newFormData: Record<string, string> = {};
    Object.keys(item).forEach((key) => {
      if (key !== "id") {
        newFormData[key] = String(item[key]);
      }
    });
    setEditingId(Number(item.id));
    setEditFormData(newFormData);
  };

  const handleSave = (id: number) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...editFormData } : item))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSort = (key: keyof DataRow) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.keys(item).some((key) => {
        if (key === "id") return false;
        return String(item[key]).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data]);

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

  return (
    <div className="bg-white dark:bg-gray-900 p-4 shadow m-10 rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        Advanced Table
      </h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full md:w-1/2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
        />
        <button
          onClick={() => setShowColumnsModal(true)}
          className="ml-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Configure Columns
        </button>
      </div>

      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            {Object.keys(visibleColumns).map(
              (key) =>
                visibleColumns[key] && (
                  <th
                    key={key}
                    className="cursor-pointer py-2 px-4 border-b dark:border-gray-600 text-white capitalize"
                    onClick={() =>
                      handleSort(key as keyof (typeof mockData)[0])
                    }
                  >
                    {key}
                    {sortConfig?.key === key
                      ? sortConfig.direction === "asc"
                        ? " ▲"
                        : " ▼"
                      : ""}
                  </th>
                )
            )}
            <th className="py-2 px-4 border-b dark:border-gray-600 text-white">
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
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                {editingId === item.id ? (
                  <>
                    {Object.keys(visibleColumns).map(
                      (key) =>
                        visibleColumns[key] && (
                          <td
                            key={key}
                            className="py-2 px-4 border-b dark:border-gray-600 dark:text-white"
                          >
                            <input
                              type="text"
                              value={editFormData[key]}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  [key]: e.target.value,
                                })
                              }
                              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white p-1"
                            />
                          </td>
                        )
                    )}
                    <td className="py-2 px-4 border-b dark:border-gray-600 space-x-2">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleSave(item.id as number)}
                      >
                        <PiCheckFatFill size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={handleCancel}
                      >
                        <MdCancel size={20} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {Object.keys(visibleColumns).map(
                      (key) =>
                        visibleColumns[key] && (
                          <td
                            key={key}
                            className="py-2 px-4 border-b dark:border-gray-600 dark:text-white"
                          >
                            {item[key]}
                          </td>
                        )
                    )}
                    <td className="py-2 px-4 border-b dark:border-gray-600 space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedId(item.id as number);
                          setShowConfirmModal(true);
                        }}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </motion.tbody>
        </AnimatePresence>
      </table>

      {/* Pagination */}
      <div className="flex flex-col justify-center mt-10 items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300 pb-4">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (selectedId !== null) {
            handleDelete(selectedId);
            toast.success("Fila borrada correctamente!", {
              icon: "🗑️",
              style: {
                borderRadius: "8px",
                background: "#72ee97",
                color: "#494949",
              },
            });
          }
        }}
        title="Borrar fila"
        message="Estas seguro que queres borrar esta fila?"
      />

      {/* Configure Columns Modal */}
      <ConfirmModal
        isOpen={showColumnsModal}
        onClose={() => setShowColumnsModal(false)}
        onConfirm={() => setShowColumnsModal(false)}
        title="Configure Columns"
        message=""
      >
        <div className="flex flex-col items-start space-y-2">
          {Object.keys(visibleColumns).map((colKey) => (
            <label
              key={colKey}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                checked={visibleColumns[colKey]}
                onChange={() =>
                  setVisibleColumns((prev) => ({
                    ...prev,
                    [colKey]: !prev[colKey],
                  }))
                }
                className="rounded text-blue-500"
              />
              <span className="capitalize">{colKey}</span>
            </label>
          ))}
        </div>
      </ConfirmModal>
    </div>
  );
};

export default AdvancedTable;

// confirm modal component
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  children,
  message = "Are you sure you want to proceed?",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm text-center"
      >
        {/** Ícono */}
        <HiOutlineExclamationTriangle
          className="mx-auto mb-4 text-yellow-500 dark:text-yellow-400"
          size={48}
        />

        {/** Título */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          {title}
        </h2>

        {/** Aca es donde agregamos lo nuevo 👇 */}
        {message && (
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        )}

        {children}

        {/** BOTONES */}
        <div className="flex justify-center space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
