module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "VERCEL_TOKEN not configured" });
  }

  try {
    const response = await fetch(
      "https://api.vercel.com/v9/projects?limit=100",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Vercel API error", detail: text });
    }

    const data = await response.json();

    const projects = (data.projects || []).map((p) => ({
      id: p.id,
      name: p.name,
      framework: p.framework ?? null,
      url:
        p.alias?.[0]?.domain
          ? `https://${p.alias[0].domain}`
          : `https://${p.name}.vercel.app`,
    }));

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: "Internal error", detail: err.message });
  }
};
