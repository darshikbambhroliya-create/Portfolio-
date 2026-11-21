"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, GitCommit, GitBranch, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  username: string;
}

interface GitStat {
  user: {
    totalContribution: number;
    currentStreak: number;
    bestDayCommit: number;
  };
  weeks: {
    date: string;
    count: number;
  }[][];
}

const GithubStreak = ({ username }: Props) => {
  const [stats, setStats] = useState<GitStat | null>(null);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch GitHub Data
  useEffect(() => {
    const controller = new AbortController();

    const fetchGithubData = async () => {
      try {
        isLoading(true);
        setError(null);

        const response = await fetch(`/api/github?username=${username}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error Fetching Data");
        }

        setStats(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        if (!controller.signal.aborted) {
          isLoading(false);
        }
      }
    };

    fetchGithubData();

    return () => controller.abort();
  }, [username]);

  // Loading UI
  if (loading) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-8 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  // Error UI
  if (error) {
    return (
      <Card className="p-4 sm:p-6 bg-card border-border/5">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  // GitHub Stats
  const totalContribution = stats?.user.totalContribution ?? 0;

  const currentStreak = stats?.user.currentStreak ?? 0;

  const bestDayCommit = stats?.user.bestDayCommit ?? 0;

  const weeks = stats?.weeks ?? [];

  return (
    <section id="github" className="container mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          Github <span className="text-yellow-500"> Activities </span>
        </h1>
      </div>

      <Card className="p-4 sm:p-6 lg:p-8 bg-card border-border/5 backdrop-blur-sm overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8">
          {/* Heading */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-yellow/10">
              <GitCommit className="w-5 h-5 text-yellow-100" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold">
              Contribution Activity
            </h3>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Streak */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-2xl">
              <Calendar width={28} height={28} className="text-yellow-500" />

              <p className="text-muted-foreground mt-3">Current Streak</p>

              <p className="text-3xl font-bold">{currentStreak} Days</p>
            </motion.div>

            {/* Total Contributions */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-2xl">
              <GitBranch width={28} height={28} className="text-yellow-500" />

              <p className="text-muted-foreground mt-3">Total Contributions</p>

              <p className="text-3xl font-bold">
                {totalContribution.toLocaleString()}
              </p>
            </motion.div>

            {/* Best Day Commits */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-2xl">
              <Star width={28} height={28} className="text-yellow-500" />

              <p className="text-muted-foreground mt-3">Best Day Commits</p>

              <p className="text-3xl font-bold">{bestDayCommit}</p>
            </motion.div>
          </div>

          {/* GitHub Contribution Graph */}
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4 sm:p-5 bg-[#0d1117]">
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Month Labels */}
                  <div className="flex gap-[3px] mb-1 pl-8">
                    {weeks.map((week, index) => {
                      const firstDay = week[0];

                      const monthStart = week.find((day) => {
                        return new Date(`${day.date}T00:00:00`).getDate() === 1;
                      });

                      const label =
                        index === 0
                          ? new Date(
                              `${firstDay.date}T00:00:00`
                            ).toLocaleDateString("en-US", {
                              month: "short",
                            })
                          : monthStart
                          ? new Date(
                              `${monthStart.date}T00:00:00`
                            ).toLocaleDateString("en-US", {
                              month: "short",
                            })
                          : "";

                      return (
                        <div
                          key={index}
                          className="w-[12px] shrink-0 text-[11px] text-muted-foreground">
                          {label}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    {/* Weekday Labels */}
                    <div className="grid grid-rows-7 gap-[3px] text-[11px] text-muted-foreground">
                      {["", "Mon", "", "Wed", "", "Fri", ""].map(
                        (day, index) => (
                          <div key={index} className="h-[12px] leading-[12px]">
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    {/* Contribution Squares */}
                    <div className="flex gap-[3px]">
                      {weeks.map((week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="grid grid-rows-7 gap-[3px]">
                          {week.map((day, dayIndex) => (
                            <motion.div
                              key={day.date}
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay: (weekIndex * 7 + dayIndex) * 0.001,
                              }}
                              title={`${day.count} contributions on ${new Date(
                                `${day.date}T00:00:00`
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}`}
                              className={`w-[12px] h-[12px] rounded-[2px] border border-white/[0.03] ${
                                day.count === 0
                                  ? "bg-[#161b22]"
                                  : day.count < 3
                                  ? "bg-[#0e4429]"
                                  : day.count < 6
                                  ? "bg-[#006d32]"
                                  : day.count < 10
                                  ? "bg-[#26a641]"
                                  : "bg-[#39d353]"
                              }`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-5 text-xs text-muted-foreground">
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors">
                  Learn how we count contributions
                </a>

                {/* Legend */}
                <div className="flex items-center gap-1.5">
                  <span>Less</span>

                  {[
                    "bg-[#161b22]",
                    "bg-[#0e4429]",
                    "bg-[#006d32]",
                    "bg-[#26a641]",
                    "bg-[#39d353]",
                  ].map((color) => (
                    <div
                      key={color}
                      className={`w-[12px] h-[12px] rounded-[2px] ${color}`}
                    />
                  ))}

                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </section>
  );
};

export default GithubStreak;
