import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();

  // Split the path: "/sidebar/users" -> ["", "sidebar", "users"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 dark:text-gray-300 mb-4 p-10">
      <ol className="list-reset flex">
        {pathnames.length === 0 && (
          <li>
            <span className="capitalize">Home</span>
          </li>
        )}
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={routeTo}
                    className="capitalize hover:underline hover:text-blue-500"
                  >
                    {name}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="capitalize">{name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
