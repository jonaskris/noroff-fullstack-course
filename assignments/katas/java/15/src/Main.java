import java.util.Arrays;

public class Main {
    /*
        Checks that all elements of input is equal.
    */
    private static boolean testJackpot(String[] input) {
        return Arrays.stream(input).skip(1).allMatch(element -> element.equals(input[0]));
    }

    public static void main(String[] args) {
        System.out.println(testJackpot(new String[]{"@", "@", "@", "@"}));
        System.out.println(testJackpot(new String[]{"abc", "abc", "abc", "abc"}));
        System.out.println(testJackpot(new String[]{"SS", "SS", "SS", "SS"}));
        System.out.println(testJackpot(new String[]{"&&", "&", "&&&", "&&&&"}));
        System.out.println(testJackpot(new String[]{"&&", "&", "&&&", "&&&&"}));
    }
}
