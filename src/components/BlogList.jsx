import React, { useEffect, useState } from "react";
import { motion as Motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContest";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [categories, setCategories] = useState([]);

  const { blogs, input, axios } = useAppContext();

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>

      {/* Categories */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap">

        {/* All */}
        <div className="relative">
          <button
            onClick={() => setMenu("All")}
            className={`cursor-pointer text-gray-300 ${
              menu === "All" && "text-white px-4 pt-0.5"
            }`}
          >
            All

            {menu === "All" && (
              <Motion.div
                layoutId="underline"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
              />
            )}
          </button>
        </div>

        {/* Dynamic Categories */}
        {categories.map((item) => (
          <div key={item._id} className="relative">

            <button
              onClick={() => setMenu(item.name)}
              className={`cursor-pointer text-gray-300 ${
                menu === item.name && "text-white px-4 pt-0.5"
              }`}
            >
              {item.name}

              {menu === item.name && (
                <Motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                />
              )}
            </button>

          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">

        {filteredBlogs()
          .filter((blog) =>
            menu === "All" ? true : blog.category === menu
          )
          .map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))}

      </div>
    </div>
  );
};

export default BlogList;