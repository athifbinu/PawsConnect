"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  PawPrint,
  MapPin,
  Syringe,
  Baby,
  Phone,
  Mail,
  IndianRupee,
  ImagePlus,
  UserRound,
} from "lucide-react";
import { supabase } from "@/supabace/config";

/* ---------------- TYPES ---------------- */

type FormDataType = {
  petName: string;
  category: string;
  vaccination: string;
  ageType: string;
  location: string;
  ownerContact: string;
  ownerEmail: string;
  ownerName: string;
  adoptionType: string;
  price: string;
  about: string;
  sex: String;
  personality: String;
  health_status: String;
  mainImage: File | null;
  subImage1: File | null;
  subImage2: File | null;
  subImage3: File | null;
};

type PreviewType = {
  mainImage: string | null;
  subImage1: string | null;
  subImage2: string | null;
  subImage3: string | null;
};

export default function AddPet() {
  /* ---------------- ALL HOOKS FIRST ---------------- */

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    petName: "",
    category: "",
    vaccination: "",
    ageType: "",
    location: "",
    ownerContact: "",
    ownerEmail: "",
    ownerName: "",
    adoptionType: "",
    price: "",
    about: "",
    sex: "",
    health_status: "",
    personality: "",
    mainImage: null,
    subImage1: null,
    subImage2: null,
    subImage3: null,
  });

  const [preview, setPreview] = useState<PreviewType>({
    mainImage: null,
    subImage1: null,
    subImage2: null,
    subImage3: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- SAFE EARLY RETURN ---------------- */

  if (!mounted) return null;

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
      setPreview((p) => ({
        ...p,
        [name]: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const uploadImage = async (
    file: File | null,
    folder: string,
    fileName: string,
  ) => {
    if (!file) return null;

    const path = `pets/${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("pets")
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from("pets").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const petFolder = Date.now().toString();

      const mainImageUrl = await uploadImage(
        formData.mainImage,
        petFolder,
        "main.jpg",
      );
      const sub1 = await uploadImage(formData.subImage1, petFolder, "sub1.jpg");
      const sub2 = await uploadImage(formData.subImage2, petFolder, "sub2.jpg");
      const sub3 = await uploadImage(formData.subImage3, petFolder, "sub3.jpg");

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
          owner_name: formData.ownerName,
          sex: formData.sex,
          health_status: formData.health_status,
          personality: formData.personality,
          price:
            formData.adoptionType === "Paid" ? Number(formData.price) : null,
          about: formData.about,
          main_image: mainImageUrl,
          sub_image_1: sub1,
          sub_image_2: sub2,
          sub_image_3: sub3,
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
        ownerName: "",
        price: "",
        about: "",
        sex: "",
        health_status: "",
        personality: "",
        mainImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
      });

      setPreview({
        mainImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
      });
    } catch (err: any) {
      Swal.fire("Upload Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <PawPrint className="text-indigo-600" />
        Add New Pet
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          icon={<PawPrint />}
          name="petName"
          placeholder="Pet Name"
          value={formData.petName}
          onChange={handleChange}
        />

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

        <Select
          icon={<Baby />}
          name="sex"
          value={formData.sex}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>

        <Select
          icon={<Baby />}
          name="ageType"
          value={formData.ageType}
          onChange={handleChange}
        >
          <option value="">Age</option>
          <option value="Adult">Adult</option>
          <option value="Puppy">Puppy</option>
          <option value="Kitten">Kitten</option>
        </Select>

        <Select
          icon={<Baby />}
          name="personality"
          value={formData.personality}
          onChange={handleChange}
        >
          <option value="">Personality</option>
          <option value="Good">Good</option>
          <option value="bad">Bad</option>
          <option value="Aggressive">Aggressive</option>
        </Select>

        <Select
          icon={<Baby />}
          name="health_status"
          value={formData.health_status}
          onChange={handleChange}
        >
          <option value="">Health status</option>
          <option value="Good">Good</option>
          <option value="bad">Bad</option>
          <option value="Need care">Need care</option>
        </Select>

        <Input
          icon={<MapPin />}
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <Input
          icon={<Phone />}
          name="ownerContact"
          placeholder="Owner Contact"
          value={formData.ownerContact}
          onChange={handleChange}
        />
        <Input
          icon={<Mail />}
          name="ownerEmail"
          placeholder="Owner Email"
          value={formData.ownerEmail}
          onChange={handleChange}
        />
        <Input
          icon={<UserRound />}
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
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
            name="price"
            placeholder="Price"
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

        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["mainImage", "subImage1", "subImage2", "subImage3"] as const).map(
            (key) => (
              <label
                key={key}
                className="border-2 border-dashed rounded-xl p-3 cursor-pointer"
              >
                {preview[key] ? (
                  <img
                    src={preview[key]!}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center gap-2">
                    <ImagePlus />
                    <span className="text-sm">
                      {key === "mainImage" ? "Main Image" : "Extra Image"}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  name={key}
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </label>
            ),
          )}
        </div>

        <button
          disabled={loading}
          className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold"
        >
          {loading ? "Uploading..." : "Add Pet"}
        </button>
      </form>
    </motion.div>
  );
}

/* ---------------- REUSABLE ---------------- */

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input {...props} className="w-full pl-12 pr-4 py-3 border rounded-2xl" />
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
        className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-white"
      >
        {children}
      </select>
    </div>
  );
}
