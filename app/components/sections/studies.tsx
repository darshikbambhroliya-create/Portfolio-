"use client";

import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "Vivekanand College for Advanced Computer & Information Science",
    location: "Surat, Gujarat",
    duration: "2023 - 2026",
    status: "Completed",
    description:
      "Studied computer applications, programming, web development, database management, and software development.",
    subjects: [
      "Python",
      "Java",
      "Web Development",
      "Database Management",
      "Computer Science",
    ],
  },
];

const Studies = () => {
  return (
    <section id="studies" className="container mx-auto px-4 py-16">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GraduationCap className="w-6 h-6 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-500">
            MY EDUCATION
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold">
          Studies & <span className="text-yellow-500">Education</span>
        </h2>

        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          My academic journey and the knowledge I've gained along the way.
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="max-w-3xl mx-auto space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}>
            <Card className="p-5 sm:p-7 bg-card border-border/50 hover:border-yellow-500/40 transition-colors">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Icon */}
                <div className="w-12 h-12 shrink-0 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-yellow-500" />
                </div>

                <div className="flex-1 space-y-4">
                  {/* Degree */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold">
                      {item.degree}
                    </h3>

                    <p className="text-muted-foreground mt-1">{item.college}</p>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-500" />
                      {item.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      {item.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Subjects */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Key Subjects</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Studies;
