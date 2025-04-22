
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Inner Conflict",
    description: "A visualization of the tension between conscious and unconscious aspects of personality",
    thumbnail: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Metamorphosis",
    description: "Transformational journey through shadow integration stages",
    thumbnail: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Duality",
    description: "Exploring the complementary nature of light and shadow in personality",
    thumbnail: "https://images.unsplash.com/photo-1566410824233-a8707fd9db64?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Rebirth",
    description: "Visual representation of renewal after confronting shadow aspects",
    thumbnail: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=600&auto=format&fit=crop",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
            animatedElements?.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding bg-shadow-primary"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center animate-on-scroll">
          FEATURED <span className="text-shadow-accent">PROJECTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
              <Card className="bg-shadow-secondary border border-shadow-accent/20 overflow-hidden hover:border-shadow-accent hover:shadow-lg hover:shadow-shadow-accent/20 transition-all duration-500">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-orbitron font-semibold mb-2 text-shadow-text">
                    {project.title}
                  </h3>
                  <p className="text-shadow-text-muted mb-4 text-sm">
                    {project.description}
                  </p>
                  <Button className="w-full button-primary">Explore</Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button className="button-primary animate-on-scroll">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
