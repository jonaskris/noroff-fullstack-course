import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class Main {

    public static HashMap<Character, Integer> findCharacterFrequency(String input) {
        input = input.toUpperCase();
        input = input.replaceAll("[^A-Z0-9]", "");

        System.out.println(input);

        LinkedHashMap<Character, Integer> characterFrequency = new LinkedHashMap<>();
        for(char ch : input.toCharArray()){
            if(characterFrequency.containsKey(ch)) {
                characterFrequency.put(ch, characterFrequency.get(ch) + 1);
            } else {
                characterFrequency.put(ch, 1);
            }
        }

        return characterFrequency;
    }

    public static void prettyPrint(HashMap<Character, Integer> characterFrequency) {
        System.out.println(characterFrequency.size());

        int max = -1;

        for(Map.Entry<Character, Integer> set : characterFrequency.entrySet()) {
            if(max == -1 || set.getValue() > max) {
                max = set.getValue();
            }
        }

        for(int row = max; row > 0; row--) {
            for(int column = 0; column < characterFrequency.size(); column++) {

            }
        }
    }

    public static void main(String[] args) {
        findCharacterFrequency("Hello class, my name is Craig!");

        //prettyPrint();
    }
}
