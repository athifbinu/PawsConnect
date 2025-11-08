"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/supabace/config"; // make sure your config path is correct

const AddPet = () => {
  const [formData, setFormData] = useState({
    petName: "",
    category: "",
    mainImage: "",
    subImage1: "",
    subImage2: "",
    subImage3: "",
    location: "",
    sex: "",
    ageType: "",
    personality: "",
    healthStatus: "",
    care: "",
    ownerContact: "",
    ownerEmail: "",
    adoptionType: "",
    price: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload image to Supabase
  const uploadImage = async (file: File, folder: string) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("pets")
      .upload(`${folder}/${fileName}`, file);

    if (error) {
      console.error("Image upload error:", error.message);
      Swal.fire("Error", "Failed to upload image", "error");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("pets")
      .getPublicUrl(`${folder}/${fileName}`);
    return publicUrlData.publicUrl;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload images
      const mainImageUrl = await uploadImage(
        formData.mainImage as unknown as File,
        "main"
      );
      const sub1Url = formData.subImage1
        ? await uploadImage(formData.subImage1 as unknown as File, "sub")
        : "";
      const sub2Url = formData.subImage2
        ? await uploadImage(formData.subImage2 as unknown as File, "sub")
        : "";
      const sub3Url = formData.subImage3
        ? await uploadImage(formData.subImage3 as unknown as File, "sub")
        : "";

      const subImages = [sub1Url, sub2Url, sub3Url].filter(Boolean);

      // Insert data into Supabase
      const { error } = await supabase.from("pets").insert([
        {
          pet_name: formData.petName,
          pet_category: formData.category,
          main_image: mainImageUrl,
          sub_images: subImages,
          location: formData.location,
          sex: formData.sex,
          age_type: formData.ageType,
          personality: formData.personality,
          health_status: formData.healthStatus,
          care: formData.care,
          owner_contact: formData.ownerContact,
          owner_email: formData.ownerEmail,
          adoption_type: formData.adoptionType,
          price: formData.price,
          about: formData.about,
        },
      ]);

      if (error) throw error;

      // ✅ Success alert
      Swal.fire({
        title: "Pet Added Successfully! 🐾",
        text: "Your pet details have been saved.",
        icon: "success",
        confirmButtonColor: "#ec4899",
      });

      // Reset form
      setFormData({
        petName: "",
        category: "",
        mainImage: "",
        subImage1: "",
        subImage2: "",
        subImage3: "",
        location: "",
        sex: "",
        ageType: "",
        personality: "",
        healthStatus: "",
        care: "",
        ownerContact: "",
        ownerEmail: "",
        adoptionType: "",
        price: "",
        about: "",
      });
    } catch (error) {
      console.error("Error adding pet:", error);
      Swal.fire("Error", "Failed to add pet", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
          🐾 Add Pet Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Name */}
          <div>
            <label className="block font-semibold mb-2">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              placeholder="Enter pet name"
            />
          </div>

          {/* Pet Category */}
          <div>
            <label className="block font-semibold mb-2">Pet Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select category</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Main Image</label>
              <input
                type="file"
                name="mainImage"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Sub Images (3)</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="file"
                  name="subImage1"
                  accept="image/*"
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
                <input
                  type="file"
                  name="subImage2"
                  accept="image/*"
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
                <input
                  type="file"
                  name="subImage3"
                  accept="image/*"
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Other fields */}
          {/* (Keep your remaining fields here unchanged) */}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
