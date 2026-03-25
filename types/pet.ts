// 🐾 Pet interface
export interface Pet {
  id: string;

  pet_name: string;
  pet_category:
    | "dog"
    | "cat"
    | "rabbit"
    | "bird"
    | "Hen"
    | "Goat"
    | "Cow"
    | "Other";

  breed?: string;
  age_type: "puppy" | "young" | "adult" | "senior";
  size?: "small" | "medium" | "large";
  sex: "male" | "female";
  color?: string;
  location: string;

  about?: string;
  personality?: string;
  care?: string;

  // ✅ FIXED spelling
  vaccination?: boolean;
  health_status?: string;
  spayed_neutered?: boolean;
  house_trained?: boolean;
  good_with_kids?: boolean;
  good_with_pets?: boolean;
  energy_level?: "low" | "medium" | "high";

  adoption_type: "Free" | "Prize";
  price?: number;

  // 🖼️ Images
  main_image: string;
  sub_images?: string[];

  // 🧍 Owner info
  owner_name?: string;
  owner_contact?: string;
  owner_email?: string;

  // 📅 Meta
  created_at?: string;
  postedDate?: string;
}

export interface FilterState {
  type: string;
  age: string;
  size: string;
  location: string;
}
