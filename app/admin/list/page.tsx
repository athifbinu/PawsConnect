"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabace/config";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { MapPin, IndianRupee, Edit3, Trash2, X } from "lucide-react";

/* ================= OPTIONS ================= */

const CATEGORY = ["Dog", "Cat", "Bird", "Fish"];
const AGE = ["Puppy", "Kitten", "Adult"];
const SEX = ["Male", "Female"];
const VACCINATION = [
  "Fully Vaccinated",
  "Partially Vaccinated",
  "Not Vaccinated",
];
const PERSONALITY = ["Friendly", "Aggressive", "Calm"];
const HEALTH = ["Good", "Need Care", "Critical"];
const ADOPTION = ["Free", "Paid"];

/* ================= PAGE ================= */

export default function ListPets() {
  const [pets, setPets] = useState<any[]>([]);
  const [editPet, setEditPet] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchPets = async () => {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPets(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  /* ================= ACTIONS ================= */

  const handleDelete = async (id: number) => {
    const ok = confirm("Delete this pet?");
    if (!ok) return;

    const { error } = await supabase.from("pets").delete().eq("id", id);
    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Deleted", "Pet removed", "success");
      fetchPets();
    }
  };

  const openEdit = (pet: any) => {
    setEditPet(pet);
    setFormData({
      pet_name: pet.pet_name,
      pet_category: pet.pet_category,
      age_type: pet.age_type,
      sex: pet.sex,
      vaccination: pet.vaccination,
      personality: pet.personality,
      health_status: pet.health_status,
      owner_contact: pet.owner_contact,
      owner_email: pet.owner_email,
      location: pet.location,
      adoption_type: pet.adoption_type,
      price: pet.price,
      about: pet.about,
    });
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from("pets")
      .update({
        ...formData,
        price:
          formData.adoption_type === "Paid" ? Number(formData.price) : null,
      })
      .eq("id", editPet.id);

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Updated", "Pet updated successfully", "success");
      setEditPet(null);
      fetchPets();
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        🐾 Manage Pets
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <img src={pet.main_image} className="h-56 w-full object-cover" />

              <div className="p-5">
                <h2 className="text-xl font-semibold">{pet.pet_name}</h2>
                <p className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pet.location}
                </p>

                <div className="flex justify-between mt-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600">
                    {pet.pet_category}
                  </span>

                  {pet.adoption_type === "Paid" ? (
                    <span className="flex items-center font-semibold text-gray-700">
                      <IndianRupee className="w-4 h-4" />
                      {pet.price}
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">Free</span>
                  )}
                </div>

                <div className="flex gap-3 mt-5">
                  <IconBtn onClick={() => openEdit(pet)}>
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </IconBtn>
                  <IconBtn onClick={() => handleDelete(pet.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </IconBtn>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}

      <AnimatePresence>
        {editPet && (
          <Modal onClose={() => setEditPet(null)}>
            <form onSubmit={handleUpdate} className="space-y-10">
              <Section title="🐾 Basic Info">
                <Grid>
                  <Input
                    label="Pet Name"
                    name="pet_name"
                    value={formData.pet_name}
                    onChange={handleChange}
                  />
                  <Select
                    label="Category"
                    name="pet_category"
                    options={CATEGORY}
                    value={formData.pet_category}
                    onChange={handleChange}
                  />
                  <Select
                    label="Age"
                    name="age_type"
                    options={AGE}
                    value={formData.age_type}
                    onChange={handleChange}
                  />
                  <Select
                    label="Gender"
                    name="sex"
                    options={SEX}
                    value={formData.sex}
                    onChange={handleChange}
                  />
                </Grid>
              </Section>

              <Section title="💉 Health">
                <Grid>
                  <Select
                    label="Vaccination"
                    name="vaccination"
                    options={VACCINATION}
                    value={formData.vaccination}
                    onChange={handleChange}
                  />
                  <Select
                    label="Personality"
                    name="personality"
                    options={PERSONALITY}
                    value={formData.personality}
                    onChange={handleChange}
                  />
                  <Select
                    label="Health Status"
                    name="health_status"
                    options={HEALTH}
                    value={formData.health_status}
                    onChange={handleChange}
                  />
                </Grid>
              </Section>

              <Section title="👤 Owner Details">
                <Grid>
                  <Input
                    label="Contact"
                    name="owner_contact"
                    value={formData.owner_contact}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email"
                    name="owner_email"
                    value={formData.owner_email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
              </Section>

              <Section title="💰 Adoption">
                <Grid>
                  <Select
                    label="Adoption Type"
                    name="adoption_type"
                    options={ADOPTION}
                    value={formData.adoption_type}
                    onChange={handleChange}
                  />
                  {formData.adoption_type === "Paid" && (
                    <Input
                      label="Price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  )}
                </Grid>
              </Section>

              <Section title="📝 About">
                <textarea
                  name="about"
                  value={formData.about || ""}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </Section>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setEditPet(null)}
                  className="px-6 py-3 rounded-full border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

const Modal = ({ children, onClose }: any) => (
  <motion.div
    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.9, y: 40 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 40 }}
      className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
    >
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">✏️ Edit Pet</h2>
        <button onClick={onClose} className="text-white">
          <X />
        </button>
      </div>
      <div className="p-8">{children}</div>
    </motion.div>
  </motion.div>
);

const Section = ({ title, children }: any) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="bg-gray-50 rounded-3xl p-6">{children}</div>
  </div>
);

const Grid = ({ children }: any) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full mt-1 rounded-2xl border px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
    />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select
      {...props}
      className="w-full mt-1 rounded-2xl border px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
    >
      <option value="">Select</option>
      {options.map((o: string) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const IconBtn = ({ children, ...props }: any) => (
  <button
    {...props}
    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
  >
    {children}
  </button>
);
