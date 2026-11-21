import { NextResponse, NextRequest } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GithubToken,
});

const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { error: "UserName is required" },
      { status: 401 }
    );
  }
  try {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - 364);
    const { user } = await octokit.graphql<{
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                date: string;
                contributionCount: number;
              }[];
            }[];
          };
        };
      } | null;
    }>(query, {
      username,
      from: from.toISOString(),
      to: today.toISOString(),
    });

    if (!user) {
      return NextResponse.json(
        { error: "GitHub user not found" },
        { status: 404 }
      );
    }
    const calendar = user.contributionsCollection.contributionCalendar;

    const allDays = calendar.weeks.flatMap((week) => week.contributionDays);

    const last30Days = allDays.slice(-30);

    const reversedDays = [...allDays].reverse();

    let currentStreak = 0;

    const startIndex = reversedDays[0]?.contributionCount === 0 ? 1 : 0;
    for (let i = startIndex; i < reversedDays.length; i++) {
      if (reversedDays[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    const bestDayCommit = Math.max(
      ...allDays.map((day) => day.contributionCount)
    );

    return NextResponse.json({
      success: true,
      user: {
        totalContribution: calendar.totalContributions,
        currentStreak,
        bestDayCommit,
      },
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      ),
    });
  } catch (error) {
    console.error(error);
  }
}
