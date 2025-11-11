"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabace/config";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Heart,
  Loader2,
  IndianRupee,
  Edit3,
  Trash2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const ListPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [editPet, setEditPet] = useState(null); // 🆕 Edit modal state
  const [formData, setFormData] = useState({});

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPets(data || []);
    } catch (err) {
      console.error("Error fetching pets:", err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;

    const { error } = await supabase.from("pets").delete().eq("id", id);
    if (error) {
      console.error("Error deleting pet:", error);
      Swal.fire("❌ Failed to delete pet", error.message, "error");
    } else {
      Swal.fire("✅ Deleted!", "Pet deleted successfully!", "success");
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    }
  };

  // 🐾 Open details modal
  const handleViewDetails = (pet) => setSelectedPet(pet);

  // 🐾 Close details modal
  const closeModal = () => setSelectedPet(null);

  // ✏️ Open edit modal
  const handleEdit = (pet) => {
    setEditPet(pet);
    setFormData({
      pet_name: pet.pet_name,
      pet_category: pet.pet_category,
      location: pet.location,
      age_type: pet.age_type,
      health_status: pet.health_status,
      care: pet.care,
      owner_contact: pet.owner_contact,
      owner_email: pet.owner_email,
      about: pet.about,
      price: pet.price,
      adoption_type: pet.adoption_type,
    });
  };

  // ✏️ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Update pet in Supabase
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("pets")
        .update(formData)
        .eq("id", editPet.id);

      if (error) throw error;

      Swal.fire("✅ Success!", "Pet updated successfully!", "success");
      setEditPet(null);
      fetchPets(); // Refresh list
    } catch (err) {
      Swal.fire("❌ Error updating pet", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        🐾 Pet Management Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-pink-500 w-10 h-10" />
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No pets found 😿
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={pet.main_image}
                  alt={pet.pet_name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(pet)}
                    className="bg-white/90 hover:bg-blue-100 p-2 rounded-full transition"
                  >
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="bg-white/90 hover:bg-red-100 p-2 rounded-full transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {pet.pet_name}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-pink-400" />
                  {pet.location || "Unknown"}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                    {pet.pet_category}
                  </span>
                  {pet.adoption_type === "Prize" ? (
                    <span className="text-sm text-gray-700 font-semibold flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-green-500" />
                      {pet.price}
                    </span>
                  ) : (
                    <span className="text-sm text-green-600 font-semibold">
                      Free
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {pet.about || "No description available."}
                </p>

                <button
                  onClick={() => handleViewDetails(pet)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300"
                >
                  <Heart className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🐶 View Details Modal */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <img
                src={selectedPet.main_image}
                alt={selectedPet.pet_name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-pink-600 mb-2">
                  {selectedPet.pet_name}
                </h2>
                <p className="text-gray-600 mb-3">
                  {selectedPet.about || "No details available."}
                </p>

                <div className="grid grid-cols-2 gap-3 text-gray-700">
                  <p>
                    <b>Category:</b> {selectedPet.pet_category}
                  </p>
                  <p>
                    <b>Location:</b> {selectedPet.location}
                  </p>
                  <p>
                    <b>Sex:</b> {selectedPet.sex}
                  </p>
                  <p>
                    <b>Age:</b> {selectedPet.age_type}
                  </p>
                  <p>
                    <b>Health:</b> {selectedPet.health_status}
                  </p>
                  <p>
                    <b>Care:</b> {selectedPet.care}
                  </p>
                  <p>
                    <b>Owner:</b> {selectedPet.owner_contact}
                  </p>
                  <p>
                    <b>Email:</b> {selectedPet.owner_email}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✏️ Edit Pet Modal */}
      <AnimatePresence>
        {editPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setEditPet(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
            >
              <button
                onClick={() => setEditPet(null)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <h2 className="text-2xl font-bold text-pink-600 mb-5 text-center">
                ✏️ Edit Pet
              </h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                {[
                  "pet_name",
                  "pet_category",
                  "location",
                  "age_type",
                  "health_status",
                  "care",
                  "owner_contact",
                  "owner_email",
                  "price",
                  "adoption_type",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    placeholder={field.replace("_", " ").toUpperCase()}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400"
                  />
                ))}

                <textarea
                  name="about"
                  value={formData.about || ""}
                  onChange={handleChange}
                  placeholder="About the pet"
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditPet(null)}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListPets;
