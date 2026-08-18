import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();
  const navigate = useNavigate();

  // Delete Blog
  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Publish / Unpublish
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update Blog
  const handleUpdate = () => {
    navigate(`/admin/update-blog/${blog._id}`);
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Number */}
      <th className="px-2 py-4">
        {index}
      </th>

      {/* Blog Title */}
      <td className="px-2 py-4">
        {title}
      </td>

      {/* Date */}
      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* Status */}
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={
            blog.isPublished
              ? "text-green-600"
              : "text-orange-700"
          }
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      {/* Actions */}
      <td className="px-2 py-4">
        <div className="flex items-center text-xs gap-3">

          {/* Publish / Unpublish */}
          <button
            onClick={togglePublish}
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-100"
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          {/* Update */}
          <button
            onClick={handleUpdate}
            className="border border-blue-500 text-blue-600 px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-blue-50"
          >
            Update
          </button>

          {/* Delete */}
          <img
            src={assets.cross_icon}
            alt="Delete"
            className="w-8 hover:scale-110 transition-all cursor-pointer"
            onClick={deleteBlog}
          />

        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;