import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function sanitizeProductPayload(body: Record<string, unknown>) {
  const { thumbnail_url, thumbnail, ...rest } = body;
  const images = Array.isArray(body.images) ? body.images : [];
  const resolvedThumbnail = thumbnail || thumbnail_url || (images.length > 0 ? images[0] : null);

  const payload: Record<string, unknown> = {
    ...rest,
    thumbnail: resolvedThumbnail,
  };

  // Remove any fields that aren't columns in products table
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;

  return payload;
}

// POST: Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.sku || !body.category || body.price === undefined) {
      return NextResponse.json(
        { error: "Name, SKU, category, and price are required." },
        { status: 400 }
      );
    }

    const payload = sanitizeProductPayload(body);
    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("products")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PUT: Update an existing product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const payload = sanitizeProductPayload(body);
    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE: Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
