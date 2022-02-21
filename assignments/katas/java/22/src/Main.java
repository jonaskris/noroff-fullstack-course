import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Scanner;

/*
*
*   Assignment text: https://open.kattis.com/problems/continuousmedian
*
* */

public class Main {
    public static int[][] parseInput(String input) {
        Scanner inputScanner = new Scanner(input);

        int cases = inputScanner.nextInt();
        int[][] parsedInput = new int[cases][];

        for(int i = 0; i < cases; i++) {
            int elements = inputScanner.nextInt();
            parsedInput[i] = new int[elements];

            for(int j = 0; j < elements; j++){
                parsedInput[i][j] = inputScanner.nextInt();
            }
        }

        return parsedInput;
    }

    public static void main(String[] args) {
        String[] inputPaths = new String[]{"./1.in"};

        for(String inputPath : inputPaths) {
            String input;
            try {
                input = Files.readString(Path.of(inputPath), StandardCharsets.UTF_8);
            } catch(Exception e) {
                System.out.println("Failed to read input file: " + inputPath);
                continue;
            }

            int[][] parsedInput = parseInput(input);

            System.out.println("----- Input '" + inputPath + "' -----");
            for(int i = 0; i < parsedInput.length; i++) {
                ContiguousMedian cm = new ContiguousMedian();
                int[] medians = new int[parsedInput[i].length];

                for(int j = 0; j < parsedInput[i].length; j++) {
                    medians[j] = cm.addElement(parsedInput[i][j]);
                }

                int sum = Arrays.stream(medians).reduce(0, Integer::sum);
                System.out.println("Sum of contiguous medians: " + sum);
            }

        }
    }
}
