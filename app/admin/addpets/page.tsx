"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Image from "next/image";
import {
  PawPrint,
  MapPin,
  Syringe,
  Baby,
  Phone,
  Mail,
  IndianRupee,
  ImagePlus,
} from "lucide-react";
import { supabase } from "@/supabace/config";

type FormDataType = {
  petName: string;
  category: string;
  vaccination: string;
  ageType: string;
  location: string;
  ownerContact: string;
  ownerEmail: string;
  adoptionType: string;
  price: string;
  about: string;
  mainImage: File | null;
};

export default function AddPet() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    petName: "",
    category: "",
    vaccination: "",
    ageType: "",
    location: "",
    ownerContact: "",
    ownerEmail: "",
    adoptionType: "",
    price: "",
    about: "",
    mainImage: null,
  });

  // -------------------------
  // HANDLE INPUT
  // -------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // -------------------------
  // IMAGE UPLOAD
  // -------------------------
  const uploadImage = async (file: File | null) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("pets")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from("pets").getPublicUrl(fileName);
    return data.publicUrl;
  };

  // -------------------------
  // SUBMIT
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage(formData.mainImage);

      const { error } = await supabase.from("pets").insert([
        {
          pet_name: formData.petName,
          pet_category: formData.category,
          vaccination: formData.vaccination,
          age_type: formData.ageType,
          location: formData.location,
          owner_contact: formData.ownerContact,
          owner_email: formData.ownerEmail,
          adoption_type: formData.adoptionType,
          price:
            formData.adoptionType === "Paid" ? Number(formData.price) : null,
          about: formData.about,
          main_image: imageUrl,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Pet Added Successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        petName: "",
        category: "",
        vaccination: "",
        ageType: "",
        location: "",
        ownerContact: "",
        ownerEmail: "",
        adoptionType: "",
        price: "",
        about: "",
        mainImage: null,
      });
      setPreview(null);
    } catch (err: any) {
      Swal.fire("Upload Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <PawPrint className="text-indigo-600" />
        Add New Pet
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* PET NAME */}
        <Input
          icon={<PawPrint />}
          placeholder="Pet Name"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
        />

        {/* CATEGORY */}
        <Select
          icon={<PawPrint />}
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Category</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Bird</option>
          <option>Fish</option>
        </Select>

        {/* VACCINATION */}
        <Select
          icon={<Syringe />}
          name="vaccination"
          value={formData.vaccination}
          onChange={handleChange}
        >
          <option value="">Vaccination</option>
          <option>Fully Vaccinated</option>
          <option>Partially Vaccinated</option>
          <option>Not Vaccinated</option>
        </Select>

        {/* AGE */}
        <Select
          icon={<Baby />}
          name="ageType"
          value={formData.ageType}
          onChange={handleChange}
        >
          <option value="">Age</option>
          <option>Puppy / Kitten</option>
          <option>Young</option>
          <option>Adult</option>
          <option>Senior</option>
        </Select>

        <Input
          icon={<MapPin />}
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <Input
          icon={<Phone />}
          placeholder="Owner Contact"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
        />
        <Input
          icon={<Mail />}
          placeholder="Owner Email"
          name="ownerEmail"
          value={formData.ownerEmail}
          onChange={handleChange}
        />

        <Select
          icon={<IndianRupee />}
          name="adoptionType"
          value={formData.adoptionType}
          onChange={handleChange}
        >
          <option value="">Adoption Type</option>
          <option>Free</option>
          <option>Paid</option>
        </Select>

        {formData.adoptionType === "Paid" && (
          <Input
            icon={<IndianRupee />}
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        )}

        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About the pet"
          className="md:col-span-2 border rounded-2xl p-4"
        />

        {/* IMAGE UPLOAD */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 mb-2 font-medium">
            <ImagePlus /> Pet Image
          </label>

          {preview && (
            <div className="mb-4">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-xl object-cover"
              />
            </div>
          )}

          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition"
        >
          {loading ? "Uploading..." : "Add Pet"}
        </button>
      </form>
    </motion.div>
  );
}

/* -------------------------
   REUSABLE COMPONENTS
------------------------- */

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function Select({ icon, children, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <select
        {...props}
        className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-white focus:ring-2 focus:ring-indigo-500"
      >
        {children}
      </select>
    </div>
  );
}
