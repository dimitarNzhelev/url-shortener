"use server";
import { db } from "~/server/db";
import { urls } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUrlBySlug(slug: string): Promise<string | null> {
  const [urlEntry] = await db
    .select()
    .from(urls)
    .where(eq(urls.slug, slug))
    .execute();

  return urlEntry ? urlEntry.targetUrl : null;
}

export async function getUrlsByUserId(userId: string): Promise<any[]> {
  const userUrls = await db
    .select()
    .from(urls)
    .where(eq(urls.userId, userId))
    .execute();

  return userUrls;
}

export async function createShortLink(
  userId: string,
  targetUrl: string,
  slug: string,
): Promise<void> {
  const existingUrl = await getUrlBySlug(slug);
  if (existingUrl) {
    throw new Error("Slug already exists");
  }

  await db
    .insert(urls)
    .values({
      userId,
      targetUrl,
      slug,
    })
    .execute();
}

export async function deleteShortLink(id: string): Promise<void> {
  await db
    .delete(urls)
    .where(eq(urls.id, Number(id)))
    .execute();
}
