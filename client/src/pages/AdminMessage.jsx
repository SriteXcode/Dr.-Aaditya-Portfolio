import { useEffect, useState } from "react";
import API from "../Api"; // axios instance (baseURL should be set)
import Loader from "../components/Loader";

const AdminMessages = () => {
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/messages");
        setMessageData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Mark as Read (PUT)
  const handleMarkRead = async (id) => {
    try {
      const res = await API.put(`/messages/${id}`, { read: true });
      setMessageData((prev) =>
        prev.map((m) => (m._id === id ? res.data : m))
      );
    } catch (err) {
      console.error("❌ Error marking read:", err.message);
    }
  };

  // ✅ Delete Message
  const handleDelete = async (id) => {
    try {
      await API.delete(`/messages/${id}`);
      setMessageData((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("❌ Error deleting:", err.message);
    }
  };

 // Show Loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 text-lg">
        Error loading messages.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Academic Inquiries & Messages
      </h2>

      <div className="space-y-4">
        {messageData.length === 0 && (
          <div className="text-gray-500 text-center py-8">No messages yet.</div>
        )}

        {messageData.map((message) => (
          <div
            key={message._id}
            className={`bg-white p-6 rounded-lg shadow-md ${
              !message.read ? "border-l-4 border-blue-500" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {message.name}
                </h3>
                <p className="text-blue-600">{message.email}</p>
                <p className="text-gray-600 mt-2">{message.message}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex space-x-2 ml-4">
                {!message.read && (
                  <button
                    onClick={() => handleMarkRead(message._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => handleDelete(message._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
