"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "@/supabace/config";

type FormDataType = {
  petName: string;
  category: string;
  mainImage: File | null;
  subImage1: File | null;
  subImage2: File | null;
  subImage3: File | null;
  location: string;
  sex: string;
  ageType: string;
  personality: string;
  healthStatus: string;
  vacsination: string;
  ownerContact: string;
  ownerEmail: string;
  adoptionType: string;
  price: string;
  about: string;
};

const AddPet = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    petName: "",
    category: "",
    mainImage: null,
    subImage1: null,
    subImage2: null,
    subImage3: null,
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

  // ✅ FIXED
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ FIXED
  const uploadImage = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("pets")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from("pets").getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ✅ FIXED
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mainImageUrl = await uploadImage(formData.mainImage);
      const subImage1Url = await uploadImage(formData.subImage1);
      const subImage2Url = await uploadImage(formData.subImage2);
      const subImage3Url = await uploadImage(formData.subImage3);

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

      const { error } = await supabase.from("pets").insert([petData]);
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Pet Added Successfully!",
        text: `${formData.petName} uploaded successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        petName: "",
        category: "",
        mainImage: null,
        subImage1: null,
        subImage2: null,
        subImage3: null,
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
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* UI PART REMAINS SAME – NO CHANGE NEEDED */}
      {/* Your existing JSX is correct */}
    </form>
  );
};

export default AddPet;
