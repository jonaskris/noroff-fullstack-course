import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static float findPercentageAboveAverage(List<Integer> scores) {
        final float averageScore = scores.stream()
                .reduce(0, Integer::sum) / (float)scores.size();

        return scores.stream()
                .filter((score) -> score > averageScore)
                .count() / (float)scores.size() * 100.0f;
    }

    // Parses string into list of integers
    public static List<Integer> parseLine(String line) {
        String[] tokens = line.split(" ");
        return Arrays.stream(tokens).skip(1).map(token -> Integer.parseInt(token)).collect(Collectors.toList());
    }

    // Parse lines to list of integers using parseLine
    public static List<List<Integer>> parseInput(String input) {
        return input.lines().skip(1).map(Main::parseLine).collect(Collectors.toList());
    }

    public static void main(String[] args) {
        String inputPath = "./1.in";

        String input = null;
        try {
            input = Files.readString(Path.of(inputPath), StandardCharsets.UTF_8);
        } catch(Exception e) {
            System.out.println("Failed to read input file: " + inputPath);
            System.exit(1);
        }

        List<List<Integer>> parsedInput = parseInput(input);

        for(List<Integer> line : parsedInput) {
            float result = findPercentageAboveAverage(line);
            System.out.println(result);
        }
    }
}
