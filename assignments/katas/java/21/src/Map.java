import java.util.Arrays;

public class Map {
    public int width, height;
    public Boolean[][] map;

    public Map(int width, int height, Boolean[][] map) {
        this.width = width;
        this.height = height;
        this.map = map;
    }

    public Map(Map other) {
        this.width = other.width;
        this.height = other.height;
        this.map = new Boolean[height][width];
        for(int y = 0; y < height; y++)
            for(int x = 0; x < width; x++)
                this.map[y][x] = other.map[y][x];
    }

    public Boolean getAt(Vec2f pos) {
        return map[pos.y][pos.x];
    }

    public void setAt(Vec2f pos, Boolean value) {
        map[pos.y][pos.x] = value;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();

        for(int y = 0; y < height; y++) {
            for(int x = 0; x < width; x++) {
                sb.append((map[y][x]) ? "1 " : "0 ");
            }
            sb.append("\n");
        }

        return sb.toString();
    }
}
