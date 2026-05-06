import type { Metadata } from "next";
import Image from "next/image";
import MapPreview from "./MapPreview";

import global1Img from "../assets/global1.jpg";
import global2Img from "../assets/global2.jpg";
import placeholderImg from "../assets/placeholder.png";
import trainingCurvesImg from "../assets/training_curves_all_models.png";

export const metadata: Metadata = {
  title: "Giovanni Sanchez — Geospatial Data Scientist",
  description: "Portfolio of Giovanni Sanchez, Geospatial Data Scientist.",
};

const projects = [
  {
    title: "Austin Food Truck Geography Analysis",
    tools: ["QGIS", "Leaflet.js", "JavaScript"],
    bullets: [
      "Mapped and analyzed the spatial distribution of permitted food trucks across Austin using QGIS, revealing clustering patterns relative to population density, transit corridors, and zoning boundaries.",
      "Built an interactive Leaflet.js web map allowing users to filter vendors by category and neighborhood, with custom marker styling and pop-up detail panels for each location.",
    ],
    link: "https://giovanni747.github.io/austin-food-map",
    linkLabel: "View Map →",
    visual: {
      type: "map" as const,
      src: "https://giovanni747.github.io/austin-food-map",
      thumbnail: {
        src: placeholderImg.src,
        alt: "Interactive map preview",
      },
    },
  },
  {
    title: "Texas County Median Income Spatial Autocorrelation",
    tools: ["Python", "GeoPandas", "PySAL", "esda"],
    bullets: [
      "Conducted a county-level spatial autocorrelation analysis of median household income across Texas using Moran's I and Local Indicators of Spatial Association (LISA), identifying statistically significant high-income and low-income spatial clusters.",
      "Visualized LISA cluster maps and Moran scatterplots to communicate regional income inequality patterns, highlighting persistent geographic disparities between urban cores and rural hinterlands.",
    ],
    visual: {
      type: "image" as const,
      layout: "side-by-side" as const,
      images: [
        {
          src: global1Img,
          alt: "Global spatial autocorrelation visualization for Texas county median income",
        },
        {
          src: global2Img,
          alt: "Global spatial autocorrelation visualization (detail)",
        },
      ],
    },
    link: null,
    linkLabel: null,
  },
  {
    title: "Austin NAIP Building Segmentation",
    tools: ["PyTorch", "U-Net", "DeepLabV3+", "SegFormer"],
    bullets: [
      "Trained and benchmarked three semantic segmentation architectures — U-Net, DeepLabV3+, and SegFormer — on high-resolution NAIP aerial imagery of Austin to extract building footprints, evaluating each model on IoU, F1, and inference speed.",
      "SegFormer outperformed CNN-based baselines in mean IoU by ~4 pp, demonstrating that transformer-based encoders better capture long-range spatial context in overhead imagery for urban building delineation.",
    ],
    visual: {
      type: "image" as const,
      images: [
        {
          src: trainingCurvesImg,
          alt: "Training curves comparing U-Net, DeepLabV3+, and SegFormer",
        },
      ],
    },
    link: null,
    linkLabel: null,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 px-6 py-20 max-w-3xl mx-auto">
      {/* Hero */}
      <section className="mb-24">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-4">Selected Work</p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Spatial Portfolio</h1>
        <p className="text-zinc-700 text-lg md:text-xl max-w-2xl leading-relaxed">
          Geospatial data science projects focused on spatial statistics, remote sensing, and interactive mapping.
        </p>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-10">Projects</h2>
        <div className="space-y-20">
          {projects.map((project) => (
            <article key={project.title}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold leading-snug">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-zinc-600 hover:text-zinc-900 transition-colors duration-200 mt-1"
                  >
                    {project.linkLabel}
                  </a>
                )}
              </div>

              {/* Tool tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-1 rounded bg-white border border-zinc-200 text-zinc-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Visual */}
              {"visual" in project && project.visual?.type === "map" && project.visual && (
                <div className="mb-5">
                  <MapPreview
                    mapUrl={project.visual.src}
                    thumbnailSrc={project.visual.thumbnail.src}
                    thumbnailAlt={project.visual.thumbnail.alt}
                    previewLabel="Interactive preview"
                  />
                </div>
              )}

              {"visual" in project && project.visual?.type === "image" && project.visual && (
                <div
                  className={`mb-5 ${
                    project.visual.layout === "side-by-side"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                      : "space-y-3"
                  }`}
                >
                  {project.visual.images.map(({ src, alt }) => (
                    <div
                      key={alt}
                      className="w-full rounded-lg overflow-hidden border border-zinc-200 bg-white"
                    >
                      <div className="relative w-full aspect-video">
                        <Image
                          src={src}
                          alt={alt}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 768px"
                          priority={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullets */}
              <ul className="space-y-2">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-lg text-zinc-700 leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-zinc-400" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-b border-zinc-200" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
