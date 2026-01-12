"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PawPrint,
  ImagePlus,
  MapPin,
  Phone,
  Mail,
  BadgeDollarSign,
} from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../supabace/config";

/* shadcn */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddPetPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    petName: "",
    category: "",
    location: "",
    sex: "",
    age: "",
    personality: "",
    health: "",
    vaccination: "",
    adoptionType: "",
    price: "",
    ownerContact: "",
    ownerEmail: "",
    about: "",
    mainImage: null,
    sub1: null,
    sub2: null,
    sub3: null,
  });

  /* -------------------- HANDLERS -------------------- */

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadImage = async (file: File | null) => {
    if (!file) return null;
    const fileName = `${Date.now()}-${file.name}`;
    await supabase.storage.from("pets").upload(fileName, file);
    return supabase.storage.from("pets").getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const main = await uploadImage(form.mainImage);
      const s1 = await uploadImage(form.sub1);
      const s2 = await uploadImage(form.sub2);
      const s3 = await uploadImage(form.sub3);

      await supabase.from("pets").insert({
        pet_name: form.petName,
        pet_category: form.category,
        main_image: main,
        sub_images: [s1, s2, s3].filter(Boolean),
        location: form.location,
        sex: form.sex,
        age_type: form.age,
        personality: form.personality,
        health_status: form.health,
        vaccination: form.vaccination,
        adoption_type: form.adoptionType,
        price: form.adoptionType === "Paid" ? form.price : null,
        owner_contact: form.ownerContact,
        owner_email: form.ownerEmail,
        about: form.about,
      });

      Swal.fire("Success", "Pet added successfully!", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <PawPrint className="text-primary" />
          Add New Pet
        </h1>
        <p className="text-muted-foreground mt-1">
          Create a new pet listing for adoption
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* PET INFO */}
        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Pet Name">
              <Input name="petName" onChange={handleChange} />
            </Field>
            <Field label="Category">
              <Input name="category" onChange={handleChange} />
            </Field>
            <Field label="Age">
              <Input name="age" onChange={handleChange} />
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
            <Field label="Personality">
              <Input name="personality" onChange={handleChange} />
            </Field>
          </CardContent>
        </Card>

        {/* HEALTH */}
        <Card>
          <CardHeader>
            <CardTitle>Health & Adoption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Health Status">
              <Input name="health" onChange={handleChange} />
            </Field>
            <Field label="Vaccination">
              <Input name="vaccination" onChange={handleChange} />
            </Field>
            <Field label="Adoption Type">
              <Select
                onValueChange={(v) => setForm({ ...form, adoptionType: v })}
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

            {form.adoptionType === "Paid" && (
              <Field label="Price">
                <div className="relative">
                  <BadgeDollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="price"
                    className="pl-9"
                    onChange={handleChange}
                  />
                </div>
              </Field>
            )}

            <Field label="Location">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="location"
                  className="pl-9"
                  onChange={handleChange}
                />
              </div>
            </Field>
          </CardContent>
        </Card>

        {/* OWNER */}
        <Card>
          <CardHeader>
            <CardTitle>Owner Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Contact">
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="ownerContact"
                  className="pl-9"
                  onChange={handleChange}
                />
              </div>
            </Field>
            <Field label="Email">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="ownerEmail"
                  className="pl-9"
                  onChange={handleChange}
                />
              </div>
            </Field>
          </CardContent>
        </Card>

        {/* IMAGES */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pet Images</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FileBox
              label="Main Image"
              name="mainImage"
              onChange={handleChange}
            />
            <FileBox label="Image 1" name="sub1" onChange={handleChange} />
            <FileBox label="Image 2" name="sub2" onChange={handleChange} />
            <FileBox label="Image 3" name="sub3" onChange={handleChange} />
          </CardContent>
        </Card>

        {/* ABOUT */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>About Pet</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              name="about"
              placeholder="Write something about the pet..."
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        {/* SUBMIT */}
        <div className="lg:col-span-3">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-lg"
          >
            {loading ? "Uploading..." : "Add Pet"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

/* ---------------- SMALL UI HELPERS ---------------- */

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
    <div className="border-dashed border-2 rounded-xl p-4 text-center">
      <ImagePlus className="mx-auto text-muted-foreground" />
      <p className="text-sm mt-2">{label}</p>
      <Input type="file" className="mt-2" {...props} />
    </div>
  );
}
