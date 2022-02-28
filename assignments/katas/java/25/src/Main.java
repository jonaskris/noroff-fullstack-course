import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;

/*
*
*   Assignment text: https://open.kattis.com/problems/primesieve
*
* */
public class Main {
    public static boolean isPrime(int n) {
        for(int i = 2; i < Math.sqrt(n)+1; i++) {
            if(n % i == 0 && n != i) {
                return false;
            }
        }
        return n > 1;
    }

    public static int nextPrime(int num) {
        for(int i = num+1; i < num*num; i++) {
            if(isPrime(i)) {
                return i;
            }
        }
        return 0;
    }

    public static int nPrimesBelow(int num) {
        int count = 1;
        int lastPrime = 2;
        while(lastPrime < num) {
            count++;
            lastPrime = nextPrime(lastPrime);
        }

        return count;
    }

    public static Input parseInput(String inputString) {
        Scanner scanner = new Scanner(inputString);
        Input parsedInput = new Input(scanner.nextInt(), scanner.nextInt(), null);
        parsedInput.x = new int[parsedInput.q];

        for(int i = 0; i < parsedInput.q; i++) {
            parsedInput.x[i] = scanner.nextInt();
        }
        return parsedInput;
    }

    public static void main(String[] args) {
        String[] inputPaths = new String[]{"./primesieve_sampla.1.in"};

        for(String inputPath : inputPaths) {
            String input;
            try {
                input = Files.readString(Path.of(inputPath), StandardCharsets.UTF_8);
            } catch(Exception e) {
                System.out.println("Failed to read input file: " + inputPath);
                continue;
            }

            Input parsedInput = parseInput(input);
            System.out.println(nPrimesBelow(parsedInput.n));
            for(int i = 0; i < parsedInput.q; i++) {
                System.out.println(isPrime(parsedInput.x[i]));
            }
        }
    }
}
