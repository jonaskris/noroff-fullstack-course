import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

/*
 *
 *       Assignment description: https://open.kattis.com/problems/fairplay
 *
*/

class Competitor {
    public int firstSkill;
    public int secondSkill;

    public Competitor(int firstSkill, int secondSkill) {
        this.firstSkill = firstSkill;
        this.secondSkill = secondSkill;
    }
}

public class Main {
    /*
    *   1. Find "target" combined skill-level for each team
    *       1.1. Each team must have the same combined skill-level per skill, which will always be the
    *            maximum skill-level of all competitors - minimum skill-level of all competitors.
    *   2. Iterate through all competitors
    *       2.1. Mark competitor as having a team
    *       2.2. Per skill, calculate remaining skill-level required for it to equal the target combined skill-level for each team.
    *       2.3. Iterate through all other competitors not already in a team
    *           2.3.1. If other competitor has exact skill-level equal to the remaining to satisfy target combined skill-level,
    *                  mark other competitor as having a team, and add both competitors to list of teams.
    *
    * */
    public static Optional<ArrayList<int[]>> findTeams(Competitor[] competitors) {
        // 1. Find "target" combined skill-level for each team
        int firstSkillTeamTarget;
        int secondSkillTeamTarget;
        try {
            int minFirstSkill = Arrays.stream(competitors).map(competitor -> competitor.firstSkill).min(Integer::compare).get();
            int maxFirstSkill = Arrays.stream(competitors).map(competitor -> competitor.firstSkill).max(Integer::compare).get();
            int minSecondSkill = Arrays.stream(competitors).map(competitor -> competitor.secondSkill).min(Integer::compare).get();
            int maxSecondSkill = Arrays.stream(competitors).map(competitor -> competitor.secondSkill).max(Integer::compare).get();
            firstSkillTeamTarget = minFirstSkill + maxFirstSkill;
            secondSkillTeamTarget = minSecondSkill + maxSecondSkill;
        } catch(Exception e) {
            return Optional.empty();
        }

        // Define teams and mark all competitors as not having a team
        boolean[] hasTeam = new boolean[competitors.length];
        Arrays.fill(hasTeam, false);
        ArrayList<int[]> teams = new ArrayList<>(competitors.length / 2);

        // 2. Iterate through all competitors
        outerLoop:
        for(int i = 0; i < competitors.length; i++) {
            if(hasTeam[i])
                continue outerLoop;
            hasTeam[i] = true;
            int firstSkillRemaining = firstSkillTeamTarget - competitors[i].firstSkill;
            int secondSkillRemaining = secondSkillTeamTarget - competitors[i].secondSkill;

            for(int j = i+1; j < competitors.length; j++) {
                if(hasTeam[j])
                    continue;
                if(competitors[j].firstSkill == firstSkillRemaining && competitors[j].secondSkill == secondSkillRemaining) {
                    hasTeam[j] = true;
                    teams.add(new int[]{i, j});
                    continue outerLoop;
                }
            }
            return Optional.empty();
        }
        return Optional.of(teams);
    }

    /*
    *   Parses input string line to pairs of numbers
    * */
    public static int[] parseLine(String line) {
        String[] tokens = line.split(" ");
        int[] nums = new int[2];
        for(int i = 0; i < 2; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }
        return nums;
    }

    /*
    *   Parses input string to Competitor array.
    *   Uses parseLine() for each line.
    * */
    public static Competitor[] parseInput(String input) {
        List<int[]> skills = input.lines().skip(1).map(line -> parseLine(line)).collect(Collectors.toList());
        Competitor[] competitors = new Competitor[skills.size()];
        for(int i = 0; i < skills.size(); i++) {
            competitors[i] = new Competitor(skills.get(i)[0], skills.get(i)[1]);
        }

        return competitors;
    }

    /*
    *   Prints team arrangement if fair teams are possible.
    *   Otherwise, prints that no fair teams are possible.
    */
    public static void prettyPrintResults(Competitor[] competitors, Optional<ArrayList<int[]>> teamsOpt, String inputPath) {
        if(teamsOpt.isPresent()) {
            ArrayList<int[]> teams = teamsOpt.get();

            System.out.println("Input '" + inputPath + "': There are fair teams!");
            for (int i = 0; i < teams.size(); i++) {
                Competitor first = competitors[teams.get(i)[0]];
                Competitor second = competitors[teams.get(i)[1]];

                System.out.println("Team " + (i+1) + ":");
                System.out.println("First team member skills: " + first.firstSkill + ", " + first.secondSkill);
                System.out.println("Second team member skills: " + second.firstSkill + ", " + second.secondSkill);
                System.out.println("Total skills: " + (first.firstSkill + second.firstSkill) + ", " + (first.secondSkill + second.secondSkill) + "\n");
            }
        } else {
            System.out.println("Input '" + inputPath + "': There are no fair teams..");
        }
    }

    /*
    *   Reads each input file, executes the algorithm per input file, and prints the results.
    */
    public static void main(String[] args) {
        String[] inputPaths = new String[]{"./1.in", "./2.in"};

        for(String inputPath : inputPaths) {
            String input;
            try {
                input = Files.readString(Path.of(inputPath), StandardCharsets.UTF_8);
            } catch(Exception e) {
                System.out.println("Failed to read input file: " + inputPath);
                continue;
            }
            Competitor[] competitors = parseInput(input);
            Optional<ArrayList<int[]>> teamsOpt = findTeams(competitors);
            prettyPrintResults(competitors, teamsOpt, inputPath);
        }
    }
}
