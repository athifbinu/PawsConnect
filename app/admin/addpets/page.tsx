"use client";

import { useState } from "react";
import { supabase } from "@/supabace/config";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  PawPrint,
  ImagePlus,
  MapPin,
  Phone,
  Mail,
  IndianRupee,
} from "lucide-react";

/* shadcn/ui */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type FormState = {
  pet_name: string;
  pet_category: string;
  location: string;
  sex: string;
  age_type: string;
  personality: string;
  health_status: string;
  vaccination: string;
  adoption_type: string;
  price: string;
  owner_contact: string;
  owner_email: string;
  about: string;
  main_image: File | null;
  sub1: File | null;
  sub2: File | null;
  sub3: File | null;
};

export default function AddPetPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    pet_name: "",
    pet_category: "",
    location: "",
    sex: "",
    age_type: "",
    personality: "",
    health_status: "",
    vaccination: "",
    adoption_type: "",
    price: "",
    owner_contact: "",
    owner_email: "",
    about: "",
    main_image: null,
    sub1: null,
    sub2: null,
    sub3: null,
  });

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadImage = async (file: File | null) => {
    if (!file) return null;

    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("pets")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage.from("pets").getPublicUrl(filePath);

    return data.publicUrl;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mainImage = await uploadImage(form.main_image);
      const s1 = await uploadImage(form.sub1);
      const s2 = await uploadImage(form.sub2);
      const s3 = await uploadImage(form.sub3);

      const { error } = await supabase.from("pets").insert([
        {
          pet_name: form.pet_name,
          pet_category: form.pet_category,
          main_image: mainImage,
          sub_images: [s1, s2, s3].filter(Boolean),
          location: form.location,
          sex: form.sex,
          age_type: form.age_type,
          personality: form.personality,
          health_status: form.health_status,
          vaccination: form.vaccination,
          adoption_type: form.adoption_type,
          price: form.adoption_type === "Paid" ? Number(form.price) : null,
          owner_contact: form.owner_contact,
          owner_email: form.owner_email,
          about: form.about,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error(error);
        Swal.fire("Upload Failed", error.message, "error");
        return;
      }

      Swal.fire("Success", "Pet added successfully!", "success");

      setForm({
        pet_name: "",
        pet_category: "",
        location: "",
        sex: "",
        age_type: "",
        personality: "",
        health_status: "",
        vaccination: "",
        adoption_type: "",
        price: "",
        owner_contact: "",
        owner_email: "",
        about: "",
        main_image: null,
        sub1: null,
        sub2: null,
        sub3: null,
      });
    } catch (err: any) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <PawPrint className="text-primary" />
        Add New Pet
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Pet Info */}
        <Card>
          <CardHeader>
            <CardTitle>Pet Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Pet Name">
              <Input
                name="pet_name"
                value={form.pet_name}
                onChange={handleChange}
              />
            </Field>

            <Field label="Category">
              <Input
                name="pet_category"
                value={form.pet_category}
                onChange={handleChange}
              />
            </Field>

            <Field label="Age">
              <Input
                name="age_type"
                value={form.age_type}
                onChange={handleChange}
              />
            </Field>

            <Field label="Sex">
              <Select onValueChange={(v) => setForm({ ...form, sex: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </CardContent>
        </Card>

        {/* Health */}
        <Card>
          <CardHeader>
            <CardTitle>Health & Adoption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Health Status">
              <Input name="health_status" onChange={handleChange} />
            </Field>

            <Field label="Vaccination">
              <Input name="vaccination" onChange={handleChange} />
            </Field>

            <Field label="Adoption Type">
              <Select
                onValueChange={(v) => setForm({ ...form, adoption_type: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {form.adoption_type === "Paid" && (
              <Field label="Price">
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 w-4 h-4" />
                  <Input
                    name="price"
                    className="pl-8"
                    onChange={handleChange}
                  />
                </div>
              </Field>
            )}
          </CardContent>
        </Card>

        {/* Owner */}
        <Card>
          <CardHeader>
            <CardTitle>Owner Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Location">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4" />
                <Input
                  name="location"
                  className="pl-8"
                  onChange={handleChange}
                />
              </div>
            </Field>

            <Field label="Contact">
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4" />
                <Input
                  name="owner_contact"
                  className="pl-8"
                  onChange={handleChange}
                />
              </div>
            </Field>

            <Field label="Email">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4" />
                <Input
                  name="owner_email"
                  className="pl-8"
                  onChange={handleChange}
                />
              </div>
            </Field>
          </CardContent>
        </Card>

        {/* Images */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <FileBox
              label="Main Image"
              name="main_image"
              onChange={handleChange}
            />
            <FileBox label="Image 1" name="sub1" onChange={handleChange} />
            <FileBox label="Image 2" name="sub2" onChange={handleChange} />
            <FileBox label="Image 3" name="sub3" onChange={handleChange} />
          </CardContent>
        </Card>

        {/* About */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>About Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              name="about"
              placeholder="Describe the pet..."
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Button type="submit" disabled={loading} className="w-full h-12">
            {loading ? "Uploading..." : "Add Pet"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function FileBox({ label, ...props }: any) {
  return (
    <div className="border-2 border-dashed rounded-xl p-4 text-center">
      <ImagePlus className="mx-auto mb-2" />
      <p className="text-sm mb-2">{label}</p>
      <Input type="file" {...props} />
    </div>
  );
}
