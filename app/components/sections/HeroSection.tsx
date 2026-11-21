"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";
const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 pt-32 pd-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-6xl">
            Hi, I'm <span className="text-yellow-500">Darshik Bambhroliya</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-8">
            Full Stack Developer crafting modern web experiences
          </p>
          <div className="flex gap-4">
            <Button variant={"default"} className="gap-2 h-10 mt-4">
              <Mail className="h-4 w-4" />
              Contact Me
            </Button>

            <Link
              href="https://github.com/darshikbambhroliya-create"
              target="_blank">
              <Button variant={"default"} className="gap-2 h-10 mt-4">
                <SiGithub size={24} />
                Github
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <Image
            src={"/webdev.svg"}
            alt="Developer illustration"
            width={500}
            height={500}
            priority
          />
          {}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
