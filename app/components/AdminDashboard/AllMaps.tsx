import React, { useEffect, useMemo, useState } from 'react';
import Loading from '../Loading';
import { useRouter } from 'next/navigation';
import DataTable from 'react-data-table-component';
import { GrMoreVertical } from 'react-icons/gr';
import { FaEye } from 'react-icons/fa';
import { BiEdit, BiTrash } from 'react-icons/bi';
import toast from 'react-hot-toast';

// Dropdown Menu for table
const ActionDropdown = ({ row, isOpen, toggleDropdown, rowId }) => {
  const handleView = (e) => {
    e.stopPropagation();
    console.log('View', row);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log('Edit', row);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Delete', row);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(rowId);
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <GrMoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
          <div className="py-1">
            <button
              onClick={handleView}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <FaEye className="mr-2" size={16} />
              View
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <BiEdit className="mr-2" size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
            >
              <BiTrash className="mr-2" size={16} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// columns for table
const columns = [
  {
    name: 'S/N',
    width: '70px',
    cell: (row, index) => <div>{index + 1}</div>,
  },
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Uploaded By',
    selector: (row) => row.uploadedBy,
    sortable: true,
  },
  {
    name: 'Actions',
    width: '100px',
    cell: (row, index, column) => (
      <ActionDropdown
        row={row}
        rowId={row.id || index}
        isOpen={column.openDropdownId === (row.id || index)}
        toggleDropdown={column.toggleDropdown}
      />
    ),
    right: true,
  },
];

// Custom styles for table
const customStyles = {
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '16px',
      fontWeight: '600',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '14px',
    },
  },
  rows: {
    style: {
      fontSize: '14px',
    },
  },
};

const AllMaps = () => {
  const [maps, setMaps] = useState([]);
  const [data, setData] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Toggle dropdown
  const toggleDropdown = (rowId) => {
    setOpenDropdownId(openDropdownId === rowId ? null : rowId);
  };

  // Search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const newMaps = maps.filter((map) => {
      const titleMatch = map.title.toLowerCase().includes(searchValue);
      const uploadedByMatch = map.uploadedBy
        .toLowerCase()
        .includes(searchValue);
      return titleMatch || uploadedByMatch;
    });

    setData(newMaps);
  };

  // Export CSV
  const convertArrayOfObjectsToCSV = (array) => {
    if (array.length === 0) {
      return '';
    }

    let result;
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  // Download CSV
  const downloadCSV = (array) => {
    try {
      const link = document.createElement('a');
      let csv = convertArrayOfObjectsToCSV(array);
      if (!csv) {
        // Handle the case where the CSV conversion failed or the data is empty
        console.log('No data to export.');
        toast.error('No data to export.');
        return;
      }

      const filename = 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', filename);
      link.click();
      toast.success('Data exported successfully.');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      // Handle the error, e.g., display a message to the user
    }
  };

  // Export button
  const Export = ({ onExport, data }) => {
    return (
      <button
        className="bg-primary text-white py-3 px-10 rounded-lg text-sm"
        onClick={() => {
          if (data.length > 0) {
            onExport();
          } else {
            // Display a message or handle the case where there's no data to export
            console.log('No data to export.');
          }
        }}
      >
        Export
      </button>
    );
  };

  // Memoize export button
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} data={data} />,
    [data]
  );

  // Memoize columns with dropdown
  const columnsWithDropdown = useMemo(() => {
    return columns.map((col) => {
      if (col.name === 'Actions') {
        return {
          ...col,
          openDropdownId,
          toggleDropdown,
        };
      }
      return col;
    });
  }, [openDropdownId]);

  // Fetch data
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setMaps(data.maps);
        setData(data.maps);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Loading
  if (!maps.length) return <Loading />;

  return (
    <div className="">
      <h3 className="text-3xl font-bold py-5">All Maps</h3>

      <div className="md:grid grid-cols-3 my-5">
        <input
          type="search"
          className="form-input placeholder:text-sm"
          placeholder="Search by title or uploader"
          onChange={handleSearch}
        />
      </div>
      <DataTable
        columns={columnsWithDropdown}
        data={data}
        pagination
        actions={actionsMemo}
        customStyles={customStyles}
      />
    </div>
  );
};

export default AllMaps;
