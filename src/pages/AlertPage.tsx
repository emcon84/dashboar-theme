import { Alert } from "../components/Alert";
import { motion } from "framer-motion";

const AlertPage = () => {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Alert type="success" message="Cambios guardados correctamente." />
      <Alert
        type="error"
        message="Error al guardar los cambios."
        description="Revisá los campos obligatorios."
      />
      <Alert
        type="warning"
        message="Atención"
        description="Esta acción no se puede deshacer."
      />
      <Alert
        type="info"
        message="Modo lectura"
        description="Estás viendo una versión de solo lectura."
      />
    </motion.div>
  );
};

export default AlertPage;
