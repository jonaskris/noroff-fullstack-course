import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

/*
*
*   Assignment text: https://open.kattis.com/problems/10kindsofpeople
*
*   Glossary:
*       Query: a pair of 2 dimensional coordinates (from.xy, to.xy)
*
* */

public class Main {

    /*
    *
    *   Performs breadth-first search starting at from, and ending search if to is encountered.
    *   Only coordinates with value = toExplore is explored.
    *   Coordinates are marked as explored by setting value to inverted toExplore.
    *
    * */
    public static Boolean canMove(Map inputMap, Vec2f from, Vec2f to, Boolean toExplore) {
        if(inputMap.getAt(from) != toExplore || inputMap.getAt(to) != toExplore)
            return false;

        Map map = new Map(inputMap); // Copy input map

        Queue<Vec2f> exploreQueue = new LinkedList<>();
        exploreQueue.add(from);
        map.setAt(from, !toExplore); // Set explored

        while(!exploreQueue.isEmpty()) {
            Vec2f current = exploreQueue.remove();
            if(current.x == to.x && current.y == to.y)
                return true;

            if(current.x > 0) {
                Vec2f neighbour = new Vec2f(current.x - 1, current.y);
                if(map.getAt(neighbour) == toExplore) {
                    map.setAt(neighbour, !toExplore); // Set explored
                    exploreQueue.add(neighbour);
                }
            }
            if(current.x < map.width - 1) {
                Vec2f neighbour = new Vec2f(current.x + 1, current.y);
                if(map.getAt(neighbour) == toExplore) {
                    map.setAt(neighbour, !toExplore); // Set explored
                    exploreQueue.add(neighbour);
                }
            }
            if(current.y > 0) {
                Vec2f neighbour = new Vec2f(current.x, current.y - 1);
                if(map.getAt(neighbour) == toExplore) {
                    map.setAt(neighbour, !toExplore); // Set explored
                    exploreQueue.add(neighbour);
                }
            }
            if(current.y < map.height - 1) {
                Vec2f neighbour = new Vec2f(current.x, current.y + 1);
                if(map.getAt(neighbour) == toExplore) {
                    map.setAt(neighbour, !toExplore); // Set explored
                    exploreQueue.add(neighbour);
                }
            }
        }

        return false;
    }

    /*
    *
    *   Extracts and parses from-to coordinates from input string.
    *
    * */
    public static Vec2f[][] parseQuery(String input) {
        Scanner scanner = new Scanner(input);

        String[] heightWidth = scanner.nextLine().split(" ");
        int height = Integer.parseInt(heightWidth[0]);

        for(int i = 0; i < height; i++)
            scanner.nextLine();

        int queryCount = scanner.nextInt();
        Vec2f[][] queries = new Vec2f[queryCount][2];
        for(int i = 0; i < queryCount; i++) {
            int fromY = scanner.nextInt() - 1;
            int fromX = scanner.nextInt() - 1;
            int toY = scanner.nextInt() - 1;
            int toX = scanner.nextInt() - 1;
            queries[i][0] = new Vec2f(fromX, fromY);
            queries[i][1] = new Vec2f(toX, toY);
        }

        return queries;
    }

    /*
    *
    *   Extracts and parses map from input string.
    *
    * */
    public static Map parseMap(String input) {
        Scanner scanner = new Scanner(input);

        String[] heightWidth = scanner.nextLine().split(" ");
        int height = Integer.parseInt(heightWidth[0]);
        int width = Integer.parseInt(heightWidth[1]);

        Boolean[][] boolMap = new Boolean[height][];

        for(int y = 0; y < height; y++) {
            String line = scanner.nextLine();

            boolMap[y] = line.chars()
                    .mapToObj(charCode -> (charCode - 48 == 1))
                    .toList()
                    .toArray(new Boolean[width]);
        }

        return new Map(width, height, boolMap);
    }

    public static void main(String[] args) {
        String[] inputPaths = new String[]{"./sample-00.in", "./sample-01.in"};

        for(String inputPath : inputPaths) {
            String input;
            Map map;
            Vec2f[][] queries;
            try {
                input = Files.readString(Path.of(inputPath), StandardCharsets.UTF_8);
                map = parseMap(input);
                queries = parseQuery(input);
            } catch(Exception e) {
                System.out.println("Failed to read input file: " + inputPath);
                continue;
            }

            System.out.println("----- Input '" + inputPath + "' -----");
            System.out.println("Map:\n" + map);

            // Check if from-to coordinate pair for each query can be explored by "binary"/"decimal" people or neither.
            for(Vec2f[] query : queries) {
                Boolean resultBinary = canMove(map, query[0], query[1], false);
                Boolean resultDecimal = canMove(map, query[0], query[1], true);

                System.out.println("Query:\n\tFrom: " + query[0] + "\n\tTo: " + query[1]);
                System.out.println("\tResult:");

                if(resultBinary) {
                    System.out.println("\t\tbinary");
                }
                if(resultDecimal) {
                    System.out.println("\t\tdecimal");
                }
                if(!resultBinary && !resultDecimal){
                    System.out.println("\t\tneither");
                }
            }
            System.out.println("");
        }
    }
}
