"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabace/config";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  MapPin,
  PawPrint,
  Heart,
  Loader2,
  IndianRupee,
  Edit3,
  Trash2,
} from "lucide-react";

const ListPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🐾 Fetch pets
  const fetchPets = async () => {
    setLoading(true);
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

  // 🗑️ Delete pet
  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#fff0f0",
    });

    if (!confirm.isConfirmed) return;

    try {
      const { error } = await supabase.from("pets").delete().eq("id", id);
      if (error) throw error;

      setPets((prev) => prev.filter((pet) => pet.id !== id));

      Swal.fire({
        icon: "success",
        title: `${name} deleted successfully!`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ✏️ Edit pet
  const handleEdit = async (pet) => {
    const { value: formValues } = await Swal.fire({
      title: `Edit ${pet.pet_name}`,
      html: `
        <input id="editName" class="swal2-input" value="${
          pet.pet_name
        }" placeholder="Pet Name">
        <input id="editLocation" class="swal2-input" value="${
          pet.location
        }" placeholder="Location">
        <input id="editPrice" class="swal2-input" value="${
          pet.price || ""
        }" placeholder="Price (if any)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      background: "#f0fdf4",
      preConfirm: () => {
        const name = document.getElementById("editName").value.trim();
        const location = document.getElementById("editLocation").value.trim();
        const price = document.getElementById("editPrice").value.trim();

        if (!name || !location)
          Swal.showValidationMessage("Please fill all required fields");

        return { pet_name: name, location, price };
      },
    });

    if (!formValues) return;

    try {
      const { error } = await supabase
        .from("pets")
        .update(formValues)
        .eq("id", pet.id);
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Pet Updated Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchPets();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // 👀 View Details
  const handleViewDetails = (pet) => {
    const subImagesHtml =
      pet.sub_images && pet.sub_images.length > 0
        ? pet.sub_images
            .map(
              (img) =>
                `<img src="${img}" alt="${pet.pet_name}" class="w-24 h-24 object-cover rounded-lg border" />`
            )
            .join("")
        : `<p>No additional images</p>`;

    Swal.fire({
      title: `<b>${pet.pet_name}</b>`,
      html: `
        <div style="text-align:left">
          <img src="${
            pet.main_image
          }" class="w-full h-56 object-cover rounded-lg mb-3" />
          <div class="flex gap-2 mb-3">${subImagesHtml}</div>
          <p><b>Category:</b> ${pet.pet_category}</p>
          <p><b>Location:</b> ${pet.location}</p>
          <p><b>Sex:</b> ${pet.sex}</p>
          <p><b>Age:</b> ${pet.age_type}</p>
          <p><b>Personality:</b> ${pet.personality}</p>
          <p><b>Health Status:</b> ${pet.health_status}</p>
          <p><b>Care:</b> ${pet.care}</p>
          <p><b>Owner Contact:</b> ${pet.owner_contact}</p>
          <p><b>Owner Email:</b> ${pet.owner_email}</p>
          <p><b>Adoption Type:</b> ${pet.adoption_type}</p>
          ${
            pet.price
              ? `<p><b>Price:</b> ₹${pet.price}</p>`
              : "<p><b>Price:</b> Free</p>"
          }
          <p class="mt-2"><b>About:</b> ${
            pet.about || "No details provided"
          }</p>
        </div>
      `,
      showCloseButton: true,
      width: 600,
      background: "#fff",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6">
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
          {pets.map((pet, index) => (
            <motion.div
              key={index}
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
                    className="bg-white/90 hover:bg-green-100 p-2 rounded-full transition"
                  >
                    <Edit3 className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id, pet.pet_name)}
                    className="bg-white/90 hover:bg-red-100 p-2 rounded-full transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
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
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300"
                >
                  <Heart className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPets;
