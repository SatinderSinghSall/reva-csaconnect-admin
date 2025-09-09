import { useEffect, useState } from "react";
import { getAdmins, deleteAdmin, updateAdmin } from "../api";
import { UserCheck } from "lucide-react";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const EditAdminModal = ({
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  onCancel,
  onSubmit,
  isSaving,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Edit Admin</h3>
      <label className="block mb-2">
        Name
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <label className="block mb-4">
        Email
        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  </div>
);

const ConfirmDeleteModal = ({
  selectedAdmin,
  onCancel,
  onConfirm,
  isDeleting,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
      <p className="mb-6 text-lg font-semibold">
        Are you sure you want to delete <br />
        <span className="text-red-600">{selectedAdmin.name}</span>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Spinner /> Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  </div>
);

const Admins = ({ token }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await getAdmins(token);
        setAdmins(res.data);
      } catch (err) {
        console.error("Failed to fetch admins", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, [token]);

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setEditName(admin.name);
    setEditEmail(admin.email);
    setEditModalOpen(true);
  };

  const submitEdit = async () => {
    setIsSaving(true);
    if (
      editName.trim() &&
      editEmail.trim() &&
      (editName !== selectedAdmin.name || editEmail !== selectedAdmin.email)
    ) {
      try {
        const res = await updateAdmin(
          selectedAdmin._id,
          { name: editName, email: editEmail },
          token
        );
        setAdmins((prev) =>
          prev.map((a) => (a._id === res.data._id ? res.data : a))
        );
      } catch (err) {
        console.error("Failed to update admin", err);
      }
    }
    setIsSaving(false);
    setEditModalOpen(false);
    setSelectedAdmin(null);
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdmin(selectedAdmin._id, token);
      setAdmins((prev) =>
        prev.filter((admin) => admin._id !== selectedAdmin._id)
      );
    } catch (err) {
      console.error("Failed to delete admin", err);
    }
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const cancelModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="p-6 pt-20 md:pt-6 min-h-screen bg-gray-50 relative">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <UserCheck size={28} className="text-green-600" />
          Admins
        </h2>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center animate-pulse"
            >
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : admins.length === 0 ? (
        <p className="text-gray-500">No admins found.</p>
      ) : (
        <div className="grid gap-4">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {admin.name}
                </p>
                <p className="text-gray-600 text-sm">{admin.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(admin)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(admin)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editModalOpen && (
        <EditAdminModal
          editName={editName}
          setEditName={setEditName}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
          onCancel={cancelModal}
          onSubmit={submitEdit}
          isSaving={isSaving}
        />
      )}

      {deleteModalOpen && selectedAdmin && (
        <ConfirmDeleteModal
          selectedAdmin={selectedAdmin}
          onCancel={cancelModal}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Admins;
