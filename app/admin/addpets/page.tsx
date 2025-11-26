"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/supabace/config";

const AddPet = () => {
  const [loading, setLoading] = useState(false);
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
    vacsination: "",
    ownerContact: "",
    ownerEmail: "",
    adoptionType: "",
    price: "",
    about: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload image to Supabase storage
  const uploadImage = async (file) => {
    if (!file) return null;
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("pets") // Bucket name
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("pets")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images
      const mainImageUrl = await uploadImage(formData.mainImage);
      const subImage1Url = await uploadImage(formData.subImage1);
      const subImage2Url = await uploadImage(formData.subImage2);
      const subImage3Url = await uploadImage(formData.subImage3);

      // Prepare data to insert
      const petData = {
        pet_name: formData.petName,
        pet_category: formData.category,
        main_image: mainImageUrl,
        sub_images: [subImage1Url, subImage2Url, subImage3Url].filter(Boolean),
        location: formData.location,
        sex: formData.sex,
        age_type: formData.ageType,
        personality: formData.personality,
        health_status: formData.healthStatus,
        vacsination: formData.vacsination,
        owner_contact: formData.ownerContact,
        owner_email: formData.ownerEmail,
        adoption_type: formData.adoptionType,
        price: formData.adoptionType === "Prize" ? formData.price : null,
        about: formData.about,
        created_at: new Date(),
      };

      // Insert into Supabase
      const { error } = await supabase.from("pets").insert([petData]);
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Pet Added Successfully!",
        text: `${formData.petName} has been uploaded to the pets list.`,
        showConfirmButton: false,
        timer: 2000,
        background: "#f0fdf4",
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
        vacsination: "",
        ownerContact: "",
        ownerEmail: "",
        adoptionType: "",
        price: "",
        about: "",
      });
    } catch (err) {
      console.error("Error adding pet:", err.message);
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: err.message || "Something went wrong.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
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

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">Pet Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Sex, Age, Personality */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-2">Pet Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Pet Age</label>
              <select
                name="ageType"
                value={formData.ageType}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Puppy">Puppy</option>
                <option value="Adult">Adult</option>
                <option value="Kitten">Kitten</option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Personality</label>
              <select
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Friendly">Friendly</option>
                <option value="Playful">Playful</option>
                <option value="Calm">Calm</option>
                <option value="Energetic">Energetic</option>
              </select>
            </div>
          </div>

          {/* Health and Care */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Health Status</label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Healthy">Healthy</option>
                <option value="Needs Care">Needs Care</option>
                <option value="Under Treatment">Under Treatment</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Vaccination</label>
              <select
                name="vacsination"
                value={formData.vacsination}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select</option>
                <option value="Vaccinated">Vaccinated</option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>
          </div>

          {/* Owner Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Owner Contact</label>
              <input
                type="tel"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Owner Email</label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                required
                placeholder="Email address"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Adoption Type */}
          <div>
            <label className="block font-semibold mb-2">Adoption Type</label>
            <select
              name="adoptionType"
              value={formData.adoptionType}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select</option>
              <option value="Free">Free Adoption</option>
              <option value="Prize">Prize</option>
            </select>
          </div>

          {formData.adoptionType === "Prize" && (
            <div>
              <label className="block font-semibold mb-2">
                Enter Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter adoption price"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            </div>
          )}

          {/* About Section */}
          <div>
            <label className="block font-semibold mb-2">About Pet</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short description about the pet..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Uploading..." : "Add Pet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
