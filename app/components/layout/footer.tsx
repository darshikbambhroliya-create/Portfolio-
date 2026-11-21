import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Heart, X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t bg-card" id="about">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">
              Darshik Bambhroliya
            </h3>

            <p className="text-muted-foreground mb-4 max-w-md">
              Full Stack Developer crafting modern web experiences with a focus
              on user experience and performance.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/darshikbambhroliya-create"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-accent hover:text-primary transition-colors">
                <SiGithub className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/darshit-bambhroliya-13b518345/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-accent hover:text-primary transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Darshik8677"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-accent hover:text-primary transition-colors">
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#project" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with
            <Heart className="w-4 h-4 text-red-500" />
            using Next.js
          </p>

          <p className="text-sm text-muted-foreground">
            © Darshik Bambhroliya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
