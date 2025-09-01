import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import API from "../Api"; // axios instance

const ManageContent = () => {
  const [data, setData] = useState({
    books: [],
    research_projects: [],
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormType, setAddFormType] = useState("books");
  const [editId, setEditId] = useState(null); // ✅ track edit mode

  // form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [journal, setJournal] = useState("");
  const [impactFactor, setImpactFactor] = useState("");
  const [indexed, setIndexed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, papersRes] = await Promise.all([
          API.get("/books"),
          API.get("/research_projects"),
        ]);
        setData((prev) => ({
          ...prev,
          books: booksRes.data || [],
          research_projects: papersRes.data || [],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch academic data.");
      }
    };

    fetchData();
  }, [setData]);

  console.log("books:", data.books);
  console.log("research_projects:", data.research_projects);

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setPublishedYear("");
    setPublisher("");
    setJournal("");
    setImpactFactor("");
    setIndexed("");
    setEditId(null);
  };

  // ✅ Add or Update Item
  const handleSubmit = async (type) => {
    if (!title) return alert("Title is required");

    const payload = {
      title,
      category,
      description,
      publishedYear,
      publisher,
      journal,
      impactFactor,
      indexed,
      image: "/api/placeholder/300/400",
      document: `/documents/${title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
    };

    try {
      if (editId) {
        // UPDATE
        const res = await API.put(`/${type}/${editId}`, payload);
        setData((prev) => ({
          ...prev,
          [type]: prev[type].map((item) =>
            item.id === editId ? res.data : item
          ),
        }));
      } else {
        // CREATE
        const res = await API.post(`/${type}`, payload);
        setData((prev) => ({ ...prev, [type]: [res.data, ...prev[type]] }));
      }

      clearForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item. Check console for details.");
    }
  };

  const handleDeleteItem = async (type, itemId) => {
  if (!confirm("Delete this item?")) return;

  try {
    await API.delete(`/${type}/${itemId}`);
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter(
        (item) => (item.id || item._id) !== itemId
      ),
    }));
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item.");
  }
};

  const handleEditItem = (type, item) => {
    setShowAddForm(true);
    setAddFormType(type);
    setEditId(item.id || item._id);

    // pre-fill form
    setTitle(item.title || "");
    setCategory(item.category || "");
    setDescription(item.description || "");
    setPublishedYear(item.publishedYear || "");
    setPublisher(item.publisher || "");
    setJournal(item.journal || "");
    setImpactFactor(item.impactFactor || "");
    setIndexed(item.indexed || "");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Manage Academic Content
      </h2>

      {/* Add Buttons */}
      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => {
            setShowAddForm(true);
            setAddFormType("books");
            clearForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Book
        </button>

        <button
          onClick={() => {
            setShowAddForm(true);
            setAddFormType("research_projects");
            clearForm();
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Research Paper
        </button>
      </div>

      {/* Add / Edit Form */}
      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(addFormType);
          }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-xl font-bold mb-4">
            {editId
              ? `Edit ${addFormType === "books" ? "Book" : "Research_Projects"}`
              : `Add New ${addFormType === "books" ? "Book" : "Research_Projects"}`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded col-span-2"
            />

            <input
              type="text"
              placeholder="Published Year"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="px-3 py-2 border rounded"
            />

            {addFormType === "books" ? (
              <input
                type="text"
                placeholder="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="px-3 py-2 border rounded"
              />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Journal"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="px-3 py-2 border rounded"
                />

                <input
                  type="text"
                  placeholder="Impact Factor"
                  value={impactFactor}
                  onChange={(e) => setImpactFactor(e.target.value)}
                  className="px-3 py-2 border rounded"
                />

                <input
                  type="text"
                  placeholder="Indexed (e.g., SCIE, Scopus)"
                  value={indexed}
                  onChange={(e) => setIndexed(e.target.value)}
                  className="px-3 py-2 border rounded"
                />
              </>
            )}
          </div>

          {/* Form Buttons */}
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              {editId ? "Update Item" : "Add Item"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                clearForm();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Content Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["books", "research_projects"].map((type) => (
          <div key={type} className="space-y-4">
            <h3 className="text-xl font-bold capitalize">
              {type === "research_projects" ? "Research Papers" : "Books"}
            </h3>
            {data[type].length === 0 && (
              <div className="text-gray-500">No items</div>
            )}
            {data[type].map((item, index) => (
              <div key={item.id || item._id || `${type}-${index}`} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.category}</p>
                {item.impactFactor && (
                  <p className="text-xs text-green-600">
                    Impact Factor: {item.impactFactor}
                  </p>
                )}
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditItem(type, item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 transition-colors flex items-center"
                  >
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(type, item.id || item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors flex items-center"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContent;
