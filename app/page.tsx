import type { Metadata } from "next";

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
  },
  {
    title: "Texas County Median Income Spatial Autocorrelation",
    tools: ["Python", "GeoPandas", "PySAL", "esda"],
    bullets: [
      "Conducted a county-level spatial autocorrelation analysis of median household income across Texas using Moran's I and Local Indicators of Spatial Association (LISA), identifying statistically significant high-income and low-income spatial clusters.",
      "Visualized LISA cluster maps and Moran scatterplots to communicate regional income inequality patterns, highlighting persistent geographic disparities between urban cores and rural hinterlands.",
    ],
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
    link: null,
    linkLabel: null,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-3xl mx-auto font-sans">
      {/* Hero */}
      <section className="mb-24">
        <h1 className="text-5xl font-bold tracking-tight mb-3">Giovanni Sanchez</h1>
        <p className="text-zinc-400 text-lg mb-6">Geospatial Data Scientist</p>
        <a
          href="https://giovanni747.github.io/austin-food-map"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm border border-zinc-700 text-zinc-300 px-4 py-2 rounded hover:border-white hover:text-white transition-colors duration-200"
        >
          Austin Food Map →
        </a>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-10">Projects</h2>
        <div className="space-y-16">
          {projects.map((project) => (
            <article key={project.title}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-semibold leading-snug">{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-zinc-500 hover:text-white transition-colors duration-200 mt-1"
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
                    className="text-xs px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <ul className="space-y-2">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 shrink-0 rounded-full bg-zinc-600" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-b border-zinc-900" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
