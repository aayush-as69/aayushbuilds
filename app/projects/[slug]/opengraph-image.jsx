import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return [
    {
      id: "og",
      alt: project
        ? `${project.name} — ${project.tagline}. A project by Aayush Singh.`
        : "A project by Aayush Singh",
      size,
      contentType,
    },
  ];
}

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const project =
    projects.find((item) => item.slug === slug) || projects[0];
  const host = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundColor: "#090B0A",
          backgroundImage:
            "linear-gradient(rgba(40,51,44,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(40,51,44,0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#39FF88",
              fontSize: 22,
              letterSpacing: 6,
            }}
          >
            A/&gt; AAYUSHBUILDS
          </div>
          <div style={{ display: "flex", color: "#83C99B", fontSize: 21 }}>
            {project.number} · {project.category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#F2F5F2",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            {project.name}
          </div>
          <div
            style={{ display: "flex", marginTop: 16, color: "#83C99B", fontSize: 32 }}
          >
            {project.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              maxWidth: 960,
              color: "#929B94",
              fontSize: 24,
              lineHeight: 1.4,
            }}
          >
            {project.summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {project.tech.slice(0, 4).map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  border: "1px solid #28332C",
                  borderRadius: 999,
                  padding: "8px 16px",
                  color: "#929B94",
                  fontSize: 17,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#39FF88", fontSize: 19 }}>
            {host}
          </div>
        </div>
      </div>
    ),
    size
  );
}
