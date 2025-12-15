import { supabase } from "../../../../supabace/config";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ message: "Pet not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Server error", error: err }),
      { status: 500 }
    );
  }
}
