import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Scanner;

/*
*
*   Assignment text: https://open.kattis.com/problems/hothike
*
* */
public class Main {

    public static int[] findBestHikeDays(int[] temperatures) {
        int indexFirstDayMinTemp = -1;
        for(int i = 0; i < temperatures.length - 2; i++){
            if(indexFirstDayMinTemp == -1
                    || Integer.max(temperatures[i], temperatures[i + 2]) < Integer.max(temperatures[indexFirstDayMinTemp], temperatures[indexFirstDayMinTemp + 2])) {
                indexFirstDayMinTemp = i;
            }
        }

        return new int[]{ indexFirstDayMinTemp + 1, Integer.max(temperatures[indexFirstDayMinTemp], temperatures[indexFirstDayMinTemp + 2]) };
    }

    public static int[] parseInput(String input) {
        Scanner inputScanner = new Scanner(input);

        int dayCount = inputScanner.nextInt();
        int[] temperatures = new int[dayCount];

        for(int i = 0; i < dayCount; i++) {
            temperatures[i] = inputScanner.nextInt();
        }

        return temperatures;
    }

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

            int[] temperatures = parseInput(input);
            int[] result = findBestHikeDays(temperatures);
            System.out.println(Arrays.toString(result));
        }
    }
}
