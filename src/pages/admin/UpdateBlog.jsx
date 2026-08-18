import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useAppContext } from "../../context/AppContest";
import toast from "react-hot-toast";
import { parse } from "marked";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { axios } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // =========================
  // Fetch Categories
  // =========================
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);

      const { data } = await axios.get("/api/category");

      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  // =========================
  // Fetch Blog
  // =========================
  const fetchBlog = async () => {
    try {
      setBlogLoading(true);

      const { data } = await axios.get(`/api/blog/${id}`);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const blog = data.blog;

      setTitle(blog.title || "");
      setSubTitle(blog.subtitle || "");
      setCategory(blog.category || "");
      setIsPublished(Boolean(blog.isPublished));
      setExistingImage(blog.image || "");
    } catch (error) {
      console.error("Fetch blog error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load blog"
      );
    } finally {
      setBlogLoading(false);
    }
  };

  // =========================
  // Load Blog + Categories
  // =========================
  useEffect(() => {
    if (!id) {
      toast.error("Blog ID not found");
      return;
    }

    fetchBlog();
    fetchCategories();
  }, [id]);

  // =========================
  // Initialize Quill
  // IMPORTANT
  // This runs AFTER blogLoading becomes false
  // =========================
  useEffect(() => {
    if (blogLoading) return;

    if (!editorRef.current) return;

    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote"],
            ["clean"],
          ],
        },
      });

      // Load existing description
      axios
        .get(`/api/blog/${id}`)
        .then(({ data }) => {
          if (data.success && quillRef.current) {
            quillRef.current.root.innerHTML =
              data.blog.description || "";
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [blogLoading, id]);

  // =========================
  // Update Blog
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Please enter blog title");
    }

    if (!subTitle.trim()) {
      return toast.error("Please enter subtitle");
    }

    if (!category) {
      return toast.error("Please select a category");
    }

    if (!quillRef.current) {
      return toast.error("Description editor is not ready");
    }

    const description =
      quillRef.current.root.innerHTML;

    if (
      !description ||
      description === "<p><br></p>"
    ) {
      return toast.error(
        "Please enter blog description"
      );
    }

    try {
      setIsUpdating(true);

      const blog = {
        title: title.trim(),
        subtitle: subTitle.trim(),
        description,
        category,
        isPublished,
      };

      const formData = new FormData();

      formData.append(
        "blog",
        JSON.stringify(blog)
      );

      // New image is optional
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.put(
        `/api/blog/${id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/admin/listBlog");
        }, 500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update blog"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // Generate AI Content
  // =========================
  const generateContent = async () => {
    if (!title.trim()) {
      return toast.error("Please enter a title");
    }

    if (!quillRef.current) {
      return toast.error(
        "Description editor is not ready"
      );
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/blog/generate",
        {
          prompt: title,
        }
      );

      if (data.success) {
        quillRef.current.root.innerHTML =
          parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Loading Screen
  // =========================
  if (blogLoading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-blue-50/50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

          <p className="mt-3 text-gray-500">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-auto"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

        {/* ================= Image ================= */}

        <p>Upload thumbnail</p>

        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : existingImage ||
                  assets.upload_area
            }
            className="mt-2 h-16 w-28 rounded cursor-pointer object-cover"
            alt="Blog thumbnail"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImage(file);
              }
            }}
          />
        </label>

        <p className="text-xs text-gray-400 mt-1">
          Select a new image only if you want to
          replace the current image.
        </p>

        {/* ================= Title ================= */}

        <p className="mt-4">
          Blog Title
        </p>

        <input
          type="text"
          placeholder="Type here"
          required
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        {/* ================= Subtitle ================= */}

        <p className="mt-4">
          Sub Title
        </p>

        <input
          type="text"
          placeholder="Type here"
          required
          value={subTitle}
          onChange={(e) =>
            setSubTitle(e.target.value)
          }
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        {/* ================= Description ================= */}

        <p className="mt-4">
          Blog Description
        </p>

        <div className="max-w-lg mt-2">

          {/* QUILL */}
          <div
            ref={editorRef}
            className="bg-white"
          ></div>

          {/* AI Button */}
          <div className="flex justify-end mt-2">
            <button
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "Generate with AI"}
            </button>
          </div>

        </div>

        {/* ================= Category ================= */}

        <p className="mt-4">
          Blog Category
        </p>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          disabled={categoryLoading}
          required
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">
            {categoryLoading
              ? "Loading categories..."
              : "Select category"}
          </option>

          {categories.map((item) => (
            <option
              key={item._id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* ================= Publish ================= */}

        <div className="mt-4">
          <p>Publish Now</p>

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) =>
              setIsPublished(
                e.target.checked
              )
            }
            className="scale-125 cursor-pointer"
          />
        </div>

        {/* ================= Submit ================= */}

        <button
          type="submit"
          disabled={isUpdating}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating
            ? "Updating..."
            : "Update Blog"}
        </button>

      </div>
    </form>
  );
};

export default UpdateBlog;