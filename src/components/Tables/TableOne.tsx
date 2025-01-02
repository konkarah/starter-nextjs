import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Heroicons for edit and delete icons

type Designation = {
  id: string;
  DesignationName: string;
  Department: string;
  createdAt: string;
  updatedAt: string;
};

const TableOne = () => {
  // State to hold the fetched designations data
  const [designations, setDesignations] = useState<Designation[]>([]);

  useEffect(() => {
    // Fetching designations data from the API
    fetch("http://localhost:3002/designations") // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => setDesignations(data)) // Set the designations data to state
      .catch((error) => console.error("Error fetching designations:", error));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Placeholder function for editing a designation
  const handleEdit = (id: string) => {
    console.log("Edit designation with id:", id);
    // Implement your edit logic here (e.g., show a modal or navigate to an edit page)
  };

  // Placeholder function for deleting a designation
  const handleDelete = (id: string) => {
    console.log("Delete designation with id:", id);
    // Implement your delete logic here (e.g., show a confirmation dialog and make an API request)
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Designations
      </h4>

      <div className="flex flex-col">
        {/* Designations Data Table */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Designation Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Department
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {designations.map((designation) => (
          <div
            key={designation.id}
            className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{designation.DesignationName}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{designation.Department}</p>
            </div>

            {/* Actions Column */}
            <div className="flex items-center justify-center p-2.5 xl:p-5 gap-3">
              <button
                onClick={() => handleEdit(designation.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(designation.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
