import java.util.Arrays;

public class Main {

    public static boolean isVowel(char character) {
        return switch (character) {
            case 'a', 'e', 'i', 'o', 'u' -> true;
            default -> false;
        };
    }

    /*
        1. For words that begin with a vowel (a, e, i, o, u), add "way" to the end of the word.
        2. Otherwise, move all letters before the first vowel to the end and add "ay".
        3. For simplicity, no punctuation will be present in the inputs.
    */
    public static String toPigLatin(String input) {
        String[] words = input.split(" ");

        for(int i = 0; i < words.length; i++) {
            if(isVowel(words[i].charAt(0))) {
                words[i] += "way";
            } else {
                int indexFirstVowel = 0;
                for(int j = 0; j < words[i].length(); j++) {
                    if(isVowel(words[i].charAt(j))) {
                        indexFirstVowel = j;
                        break;
                    }
                }

                if(indexFirstVowel == 0)
                    continue;

                words[i] = words[i].substring(indexFirstVowel) + words[i].substring(0, indexFirstVowel) + "ay";
            }
        }

        return String.join(" ", words);
    }

    public static void main(String[] args) {
        System.out.println(toPigLatin("this is pig latin"));
        System.out.println(toPigLatin("wall street journal"));
        System.out.println(toPigLatin("raise the bridge"));
        System.out.println(toPigLatin("all pigs oink"));
    }
}
