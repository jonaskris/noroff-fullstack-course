import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/*
    Assignment: https://open.kattis.com/problems/metaprogramming
*/
public class Eiger {
    HashMap<String, Integer> memory = new HashMap<String, Integer>();

    void executeDefine(String key, int value)
    {
        memory.put(key, value);
    }

    Optional<Boolean> executeEval(String left, String right, char comp) throws Exception
    {
        if(!memory.containsKey(left) || !memory.containsKey(right)) {
            return Optional.empty();
        }

        return switch(comp) {
            case '<' -> Optional.of(memory.get(left) < memory.get(right));
            case '=' -> Optional.of(memory.get(left) == memory.get(right));
            case '>' -> Optional.of(memory.get(left) > memory.get(right));
            default -> throw new Exception("Comparison operand not valid!");
        };
    }

    void executeLine(String line)
    {
        String[] words = line.split(" ");
        if(words.length == 3) {
            executeDefine(words[2], Integer.parseInt(words[1]));
        } else {
            try {
                Optional<Boolean> res = executeEval(words[1], words[3], words[2].charAt(0));
                if(res.isPresent()) {
                    System.out.println(res.get());
                } else {
                    System.out.println("undefined");
                }
            } catch(Exception exception) {
                System.out.println("Got exception at evaluation!" + exception);
            }
        }
    }

    public Eiger(String program) {
        program.lines().forEach(line -> executeLine(line));
    }

    public static void main(String[] args) {
        String program = """
        define 5 hellothere
        define 6 goodbye
        eval hellothere < goodbye
        eval hellothere > goodbye
        eval hellothere = goodbye
        eval hellothere = hi
        define 5 hi
        eval hellothere = hi
        define 6 hi
        eval hellothere = hi
        """;
        Eiger eiger = new Eiger(program);

    }
}
