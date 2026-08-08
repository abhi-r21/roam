import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const NOTION_DATABASE_ID = "3dbb18e54d084c48835a51ec2ae15d16";

async function emailExists(email: string): Promise<boolean> {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: {
          property: "Email",
          email: { equals: email },
        },
        page_size: 1,
      }),
    }
  );
  const data = await res.json();
  return data.results?.length > 0;
}

export async function POST(req: NextRequest) {
  try {
    
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (await emailExists(normalizedEmail)) {
      return NextResponse.json({ alreadyJoined: true }, { status: 200 });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: normalizedEmail.split("@")[0] } }] },
          Email: { email: normalizedEmail },
          Source: { select: { name: "waitlist-page" } },
        },
      }),
    });

    if (!res.ok) {
      console.error("Notion error:", await res.json());
      return NextResponse.json({ error: "Failed to save." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}