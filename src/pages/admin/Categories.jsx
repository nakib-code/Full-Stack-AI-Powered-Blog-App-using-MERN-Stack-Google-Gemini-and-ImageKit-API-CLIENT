import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus } from "react-icons/fi";

const Categories = () => {
  const { axios } = useAppContext();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Get categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");

      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Please enter category name");
    }

    try {
      setLoading(true);

      const { data } = await axios.post("/api/category", {
        name: name.trim(),
      });

      if (data.success) {
        toast.success(data.message);

        setName("");

        // Refresh category list
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`/api/category/${id}`);

      if (data.success) {
        toast.success(data.message);

        setCategories((prev) =>
          prev.filter((category) => category._id !== id)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex-1 bg-blue-50/50 min-h-full overflow-y-auto p-4 md:p-10">

      <div className="max-w-4xl mx-auto">
        {/* Add Category */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-5 mb-8"
        >
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Add New Category
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border text-black border-gray-300 rounded px-4 py-2.5 outline-none focus:border-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded hover:bg-primary/90 transition disabled:opacity-50"
            >
              <FiPlus />

              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>

        {/* Category List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">

          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Categories ({categories.length})
            </h2>
          </div>

          {categories.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No categories found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">

              {categories.map((category, index) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {index + 1}
                    </span>

                    <span className="font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(category._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                    title="Delete category"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Categories;